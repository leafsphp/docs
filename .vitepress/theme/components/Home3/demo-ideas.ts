// Example prompts for the homepage demo. Each idea is what a coding agent might
// write inside a Leaf project for that request. Keep lines under ~62 chars so
// the code fits beside the slider handle at its starting position.
export type Idea = {
  key: 'salon' | 'waitlist' | 'orders';
  label: string;
  prompt: string;
  summary: string;
  files: [path: string, code: string][];
};

export const ideas: Idea[] = [
  {
    key: 'salon',
    label: 'Salon bookings',
    prompt: 'Build a booking page for my salon. Clients pick a free slot and pay a deposit.',
    summary: 'Done. 3 new files, right where Leaf expects them.',
    files: [
      [
        'app/routes/bookings.php',
        "<?php\n\napp()->get('/book', 'BookingsController@create');\n\napp()->post('/book', 'BookingsController@store');",
      ],
      [
        'app/controllers/BookingsController.php',
        "<?php\n\nnamespace App\\Controllers;\n\nuse App\\Models\\Booking;\n\nclass BookingsController extends Controller\n{\n    public function create()\n    {\n        $slots = Booking::where('booked', false)->get();\n\n        response()->inertia('book', ['slots' => $slots]);\n    }\n\n    public function store()\n    {\n        $data = request()->validate([\n            'name' => 'string',\n            'email' => 'email',\n            'slot_id' => 'number',\n        ]);\n\n        $booking = Booking::reserve($data);\n\n        billing()->charge($booking);\n\n        response()->redirect('/book/thanks');\n    }\n}",
      ],
      [
        'app/models/Booking.php',
        "<?php\n\nnamespace App\\Models;\n\nclass Booking extends Model\n{\n    protected $fillable = ['name', 'email', 'booked'];\n\n    public static function reserve($data)\n    {\n        $slot = static::find($data['slot_id']);\n\n        $slot->update([...$data, 'booked' => true]);\n\n        return $slot;\n    }\n}",
      ],
    ],
  },
  {
    key: 'waitlist',
    label: 'Waitlist page',
    prompt: 'Make a waitlist page that saves emails and shows how many people joined.',
    summary: 'Done. A route, a controller and a React page.',
    files: [
      [
        'app/routes/waitlist.php',
        "<?php\n\napp()->get('/', 'WaitlistController@show');\n\napp()->post('/join', 'WaitlistController@join');",
      ],
      [
        'app/controllers/WaitlistController.php',
        "<?php\n\nnamespace App\\Controllers;\n\nclass WaitlistController extends Controller\n{\n    public function show()\n    {\n        $count = db()->select('waitlist')->count();\n\n        response()->inertia('waitlist', ['count' => $count]);\n    }\n\n    public function join()\n    {\n        $data = request()->validate(['email' => 'email']);\n\n        if (!$data) {\n            $errors = request()->errors();\n\n            return response()->json($errors, 400);\n        }\n\n        db()->insert('waitlist')->params($data)->execute();\n\n        response()->json(['joined' => true]);\n    }\n}",
      ],
      [
        'app/views/waitlist.jsx',
        'export default function Waitlist({ count }) {\n  return (\n    <form method="post" action="/join">\n      <h1>Be first in line</h1>\n\n      <p>{count} people already joined.</p>\n\n      <input name="email" type="email" required />\n      <button>Join the waitlist</button>\n    </form>\n  );\n}',
      ],
    ],
  },
  {
    key: 'orders',
    label: 'Orders API',
    prompt: 'An orders API my mobile app can call, only for signed-in users.',
    summary: 'Done. Protected routes and a controller.',
    files: [
      [
        'app/routes/api.php',
        "<?php\n\napp()->group('/api', [\n    'middleware' => 'auth.required',\n    function () {\n        app()->get('/orders', 'OrdersController@index');\n        app()->post('/orders', 'OrdersController@store');\n    },\n]);",
      ],
      [
        'app/controllers/OrdersController.php',
        "<?php\n\nnamespace App\\Controllers;\n\nuse App\\Models\\Order;\n\nclass OrdersController extends Controller\n{\n    public function index()\n    {\n        $orders = Order::where('user_id', auth()->id())\n            ->get();\n\n        response()->json($orders);\n    }\n\n    public function store()\n    {\n        $data = request()->validate(['items' => 'array']);\n\n        $order = Order::create([\n            ...$data,\n            'user_id' => auth()->id(),\n        ]);\n\n        billing()->charge($order);\n\n        response()->json($order, 201);\n    }\n}",
      ],
    ],
  },
];
