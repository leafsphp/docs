# Leaf 5 — Advanced Features Reference

## Application Cache

```bash
leaf install cache
```

File-based caching. No configuration needed.

```php
// Cache with auto-fetch (most common pattern)
$data = cache('queries.complexQuery', 60 * 60, function () {
    return db()->select('complex_table')->where('col', 'val')->get();
});

// Cache permanently (no duration)
cache('settings.siteConfig', function () {
    return db()->select('settings')->get();
});

// Retrieve only (returns null if not cached)
$data = cache('queries.complexQuery');

// Overwrite existing cache
cache()->put('queries.complexQuery', $newData, 60 * 60);

// Delete
cache()->forget('queries.complexQuery');
cache()->flush();  // clear all — use with caution
```

---

## File Storage

```bash
leaf install fs
```

### File Paths

```php
$path = path('path/to/file.txt');
$path->dirname();    // path/to
$path->basename();   // file.txt
$path->extname();    // txt

path('path')->join('to', 'file.txt');                       // path/to/file.txt
path('path/to/parent/..//file.txt')->normalize();           // path/to/file.txt
```

### Files

```php
// Create
storage()->createFile('path/to/file.txt');
storage()->createFile('path/to/file.txt', 'Hello, world!');
storage()->createFile('path/to/file.txt', function () { return 'Hello!'; });
storage()->createFile('path/to/file.txt', 'content', ['overwrite' => true]);

// Read
$content = storage()->read('path/to/file.txt');

// Update
storage()->writeFile('path/to/file.txt', 'New content');
storage()->writeFile('path/to/file.txt', function ($current) {
    return $current . ' appended';
});

// File info
$info         = storage()->fileInfo('path/to/file.txt');
$size         = storage()->size('path/to/file.txt');         // bytes
$type         = storage()->type('path/to/file.txt');
$lastModified = storage()->lastModified('path/to/file.txt');
$ext          = storage()->extension('path/to/file.txt');    // txt
$base         = storage()->basename('path/to/file.txt');     // file.txt
$dir          = storage()->dirname('path/to/file.txt');      // path/to

// Exists / type checks
storage()->exists('path/to/file.txt');
storage()->isFile('path/to/file.txt');
storage()->isFolder('path/to/folder');

// Operations
storage()->rename('path/to/old.txt', 'path/to/new.txt');
storage()->copy('path/to/file.txt', 'path/to/copy.txt');
storage()->move('path/to/file.txt', 'path/to/new-location.txt');
storage()->delete('path/to/file.txt');
storage()->chmod('path/to/file.txt', 0777);
storage()->link('path/to/file.txt', 'path/to/symlink.txt');  // symlink

// Error handling (all operations return bool)
if (!$result) { $errors = storage()->errors(); }
```

### Folders

```php
storage()->createFolder('path/to/folder');
storage()->createFolder('path/to/folder', ['recursive' => true, 'rename' => true]);
storage()->isEmpty('path/to/folder');
storage()->list('path/to/folder');
storage()->list('path/to/folder', '*.php');
storage()->list('path/to/folder', function ($file) {
    return storage()->isFile($file) && storage()->extension($file) === 'php';
});
storage()->rename('path/to/folder', 'path/to/new-folder');
storage()->copy('path/to/folder', 'path/to/new-folder');
storage()->move('path/to/folder', 'path/to/new-location');
storage()->delete('path/to/folder');
```

### File Uploads (via request)

```php
$uploaded = request()->upload('fileInput', './uploads');

if ($uploaded) {
    echo $uploaded['name'];      // file name
    echo $uploaded['path'];      // file path
    echo $uploaded['size'];      // file size
    echo $uploaded['type'];      // file type
    echo $uploaded['extension']; // file extension
    echo $uploaded['url'];       // full URL (if APP_URL is set)
} else {
    $errors = request()->errors();
}

// With options
$uploaded = request()->upload('fileInput', './uploads', [
    'maxSize'           => 1024 * 1024,    // 1MB
    'allowedTypes'      => ['image'],       // image, video, audio, text, presentation, compressed, spreadsheet, application
    'allowedExtensions' => ['jpg', 'png'],
    'validate'          => true,
    'overwrite'         => false,
    'rename'            => true,
    'recursive'         => false,
    'mode'              => 0777,
]);

// Multiple files (<input type="file" name="files[]" multiple>)
$uploaded = request()->upload('files', './uploads');
// $uploaded is an array of file info arrays
```

### Cloud / S3 Storage

```bash
leaf install s3
```

```env
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_DEFAULT_REGION=weur
AWS_BUCKET=bucket-name
AWS_URL=https://cdn.example.com
AWS_ENDPOINT=https://something.r2.cloudflarestorage.com
```

```php
// Use withBucket() in place of a local path
$url = request()->upload('file', 'local/path', withBucket('path/in/bucket'))['url'] ?? null;

storage()->createFile(
    withBucket("imports/$id/video.mp4"),
    $videoContent,
    ['rename' => true, 'recursive' => true]
);
```

---

## Queues & Background Jobs (MVC Only)

```bash
leaf install queue
```

Default backend: database (`leaf_php_jobs` table). Worker starts automatically with `leaf serve`.

### Creating a Job

```bash
leaf g:job SendEmail   # → app/jobs/SendEmailJob.php
```

```php
namespace App\Jobs;
use Leaf\Job;

class SendEmailJob extends Job
{
    protected $delay             = 10;  // seconds before processing
    protected $tries             = 3;   // max attempts (default 3)
    protected $delayBeforeRetry  = 5;   // seconds before retry
    protected $timeout           = 60;  // seconds before kill
    protected $connection        = 'myOtherConnection'; // specific DB connection

    public function handle($userId)
    {
        UserMailer::welcome($userId)->send();
    }
}
```

### Dispatching

```php
dispatch(SendEmailJob::class);                        // no data
dispatch(SendEmailJob::with($userId));                // with data
dispatch([                                            // multiple jobs
    SendEmailJob::with($userId),
    SendReminderJob::with($userId),
]);
```

> Jobs are stateless — no access to request, session, or auth. Pass all needed data via `with()`.

### Scheduled Jobs

```php
public function schedule()
{
    return $this->every('week')->on('tuesday')->at('8:00');
    // or:
    return $this->cron('0 8 * * 2');
}
```

Leaf auto-detects `schedule()` and runs it. Worker must be running.

### Worker

```bash
leaf queue:work       # start manually
php leaf queue:work & # background (production — use Supervisor instead, see app-config.md)
```

### Redis Queue

```env
QUEUE_CONNECTION=redis
```

```bash
leaf config:publish queue   # → config/queue.php
```

---

## Billing (MVC Only)

```bash
leaf install stripe    # or:
leaf install paystack
```

```env
BILLING_PROVIDER=stripe
STRIPE_API_KEY=sk_test_XXXX
STRIPE_PUBLISHABLE_KEY=pk_test_XXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXX
```

### One-Time Payment

```php
$session = billing()->charge([
    'currency'    => 'USD',
    'description' => 'Cart purchase',
    'metadata'    => ['cart_id' => $cartId],
]);

response()->redirect($session->url());
```

### Payment Callback

```php
$event = billing()->callback();

if ($event->isSuccessful()) {
    // success
} else {
    $session  = $event->session();
    $metadata = $event->metadata();
}
```

### Subscriptions

```bash
leaf scaffold:subscriptions   # generates controllers, routes, views, config
leaf config:billing           # publishes plans to Stripe
```

```php
// config/billing.php — tiers
'tiers' => [
    [
        'name'          => 'Starter',
        'description'   => 'For individuals',
        'trialDays'     => 5,
        'price.monthly' => 100,
        'price.yearly'  => 1000,
        'discount'      => 25,
        'features'      => [/* ... */],
    ],
]
```

Display pricing component (Blade):
```blade
@component('components.billing.pricing')
```

Check billing status:
```blade
@if (auth()->user()->hasActiveSubscription())
@if (auth()->user()->subscription() === 'Starter')
@if (auth()->user()->isOnTrial())
```

### Webhooks

```php
$event = billing()->webhook();

$event->type();
$event->is('invoice.payment_succeeded');
$event->tier();
$event->subscription();
$event->user();
$event->previousSubscriptionTier();
$event->activateSubscription();
$event->cancelSubscription();
$event->data();
$event->metadata();
```

### Billing Middleware

```php
app()->get('/pro', ['middleware' => 'billing.subscribed', function () { /* ... */ }]);
app()->get('/upgrade', ['middleware' => 'billing.not-subscribed:Starter', 'SubscriptionController@subscribe']);

// billing.subscribed, billing.subscribed:plan, billing.not-subscribed, billing.not-subscribed:plan
// Customize failure behavior:
billing()->middleware('billing.subscribed', fn () => response()->redirect('/upgrade'));
```

### Raw Provider Access

```php
$stripeSession = billing()->provider()->checkout->sessions->create([/* ... */]);
```

---

## Internationalization / i18n — Lingo

```bash
leaf install lingo
```

### Translation Files

```yaml
# app/locales/fr.yml
hero.title: "Bonjour le monde"
greeting.message: "Bonjour, {{ name }}!"
farewell.message: "Au revoir, $name!"
```

### Usage

```php
lingo('hero.title');                          // "Bonjour le monde"
lingo('greeting.message', ['name' => 'John']); // "Bonjour, John!"
```

Blade: `@lingo('hero.title')`

### Modes

| Mode | Strategy | Config |
|---|---|---|
| Route (default) | Adds `/en/`, `/fr/` prefixes to all routes | — |
| Header | Uses `Accept-Language` header | `LOCALES_STRATEGY=header` |
| Session | Stores locale in session | `LOCALES_STRATEGY=session` |

### Locale Switching

```php
app()->post('/language/switch', function () {
    lingo()->setCurrentLocale(request()->get('locale'));
});
```

### Locale Info

```php
lingo()->getCurrentLocale();          // 'fr_FR'
lingo()->getCurrentLanguage();         // 'fr'
lingo()->getDefaultLocale();
lingo()->is('fr');
lingo()->getAvailableLocales();        // ['en', 'fr', 'de']
lingo()->getAvailableLocalesWithNames(); // ['en' => 'English', 'fr' => 'Français']
lingo()->url('home');                  // '/fr/home'
lingo()->variants(['en' => '/products', 'fr' => '/produits']);
```

### Multi-language Routes (Route Mode)

```php
app()->get('/products', [
    'lingo.routes' => [
        'en' => '/products',
        'fr' => '/produits',
        'de' => '/produkte',
    ],
    'ProductsController@index'
]);

// Disable localization for a route
app()->get('/api/health', ['lingo.routes' => false, function () { /* ... */ }]);
```

---

## Sitemap Generator

```bash
leaf install sitemap
```

Sitemap auto-generates from your Leaf routes on first request. Regenerate manually:

```php
sitemap()->generate();
```

### Route Config

```php
app()->get('/about', [
    'sitemap' => ['changefreq' => 'monthly', 'priority' => 0.5],
    function () { echo 'About'; }
]);

// Dynamic route with model
app()->get('/blog/{slug}', [
    'sitemap' => [
        'changefreq' => 'weekly',
        'priority'   => 0.8,
        'model'      => \App\Models\Post::class,  // or 'posts' (table name)
        'parameter'  => 'slug',
        'exclude'    => ['status' => 'draft'],
    ],
    'BlogController@show'
]);
```

### Custom Datasources

```php
sitemap()->source(function () {
    $posts = db()->select('posts')->get();

    foreach ($posts as $post) {
        // Map route pattern to actual URL
        sitemap()->map('/blog/{slug}', "/blog/{$post->slug}", [
            'lastmod'    => $post->updated_at,
            'changefreq' => 'weekly',
            'priority'   => 0.8,
        ]);

        // Multi-language URLs
        sitemap()->map('/blog/{slug}', [
            "/en/blog/{$post->slug_en}" => ['changefreq' => 'weekly', 'priority' => 0.8],
            "/fr/blog/{$post->slug_fr}" => ['changefreq' => 'weekly', 'priority' => 0.8],
        ]);

        // Add URL directly (without mapping a route)
        sitemap()->add("/blog/{$post->slug}", [
            'lastmod'    => $post->updated_at,
            'changefreq' => 'weekly',
            'priority'   => 0.8,
        ]);
    }
});
```
