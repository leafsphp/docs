# Leaf 5: Utilities Reference

## Anchor (Security Guard)

Anchor runs automatically in the background, you rarely interact with it directly.

### What it does automatically:
- **XSS protection**, sanitizes all data coming through `request()`, `session()`, `response()`, etc.
- **SQL injection protection**, integrates with Leaf DB to auto-escape all query parameters
- **CSRF**, via the CSRF module (opt-in, see `references/security.md`)

> Anchor's XSS and SQL protection only works with Leaf functions. If you use raw `$_POST`, `$_GET`, `$_REQUEST`, sanitize manually:

```php
$data = anchor()->sanitize($_POST['data']);
```

Sanitization ≠ validation. Always validate data too, user input is evil and should never be trusted.

---

## Dates: `tick()`

```bash
leaf install date
```

### Creating a Date

```php
tick();                              // now
tick('2018-01-01 12:00:00');         // from string
tick(new DateTime('2018-01-01'));     // from DateTime object
```

### Getting & Setting Values

```php
// Getter (no arg) / Setter (with arg) — returns new tick object
tick()->year();           tick()->year(2018);
tick()->month();          tick()->month(6);
tick()->day();            tick()->day(15);        // day of month
tick()->hour();           tick()->hour(12);
tick()->minute();         tick()->minute(30);
tick()->second();         tick()->second(0);
tick()->millisecond();    tick()->millisecond(0);

// Generic get/set
tick()->get('year');
tick()->set('year', 2018);
```

**Units reference:**

| Unit | Shorthand | Description |
|---|---|---|
| `date` | `D` | Day of month |
| `day` | `d` | Day of week (Sunday=0, Saturday=6) |
| `month` | `M` | Month (January=0, December=11) |
| `year` | `y` | Year |
| `hour` | `h` | Hour |
| `minute` | `m` | Minute |
| `second` | `s` | Second |
| `millisecond` | `ms` | Millisecond |

### Add & Subtract

```php
tick()->add(1, 'day');
tick()->add(1, 'week');
tick()->add(3, 'month');
tick()->subtract(1, 'day');
tick()->subtract(2, 'year');
```

**Add/subtract units:** `day`, `week`, `month`, `year`, `hour`, `minute`, `second`, `millisecond` (shorthand also accepted)

### Start & End Of

```php
tick()->startOf('month');  // 2024-10-01 00:00:00
tick()->startOf('year');   // 2024-01-01 00:00:00
tick()->endOf('month');    // 2024-10-31 23:59:59
tick()->endOf('year');     // 2024-12-31 23:59:59
```

**Available units:** `year`, `month`, `week`, `date`/`day`, `hour`, `minute`, `second`

### Chaining

```php
tick()
    ->startOf('month')
    ->add(1, 'day')
    ->set('year', 2018)
    ->format('YYYY-MM-DD HH:mm:ss');
```

### Formatting

```php
tick()->format();                          // ISO8601: '2024-10-03T18:04:37+00:00'
tick('2019-01-25')->format('DD/MM/YYYY');  // '25/01/2019'

// Escape text in format string with brackets
tick('2019-01-25')->format('[Today is] DD/MM/YYYY');  // 'Today is 25/01/2019'
```

**Format tokens:**

| Token | Output | Description |
|---|---|---|
| `YYYY` | `2024` | 4-digit year |
| `YY` | `24` | 2-digit year |
| `MMMM` | `January` | Full month name |
| `MMM` | `Jan` | Abbreviated month |
| `MM` | `01-12` | Month, 2-digit |
| `M` | `1-12` | Month |
| `DD` | `01-31` | Day of month, 2-digit |
| `D` | `1-31` | Day of month |
| `dddd` | `Sunday` | Full day name |
| `ddd` | `Sun` | Short day name |
| `dd` | `Su` | Min day name |
| `d` | `0-6` | Day of week |
| `HH` | `00-23` | Hour, 24h, 2-digit |
| `H` | `0-23` | Hour, 24h |
| `hh` | `01-12` | Hour, 12h, 2-digit |
| `h` | `1-12` | Hour, 12h |
| `mm` | `00-59` | Minute, 2-digit |
| `m` | `0-59` | Minute |
| `ss` | `00-59` | Second, 2-digit |
| `s` | `0-59` | Second |
| `SSS` | `000-999` | Millisecond, 3-digit |
| `A` | `AM`/`PM` | AM/PM |
| `a` | `am`/`pm` | am/pm |
| `Z` | `+01:00` | UTC offset |
| `ZZ` | `+0100` | UTC offset (no colon) |

### Relative Time

```php
tick('2014-10-01')->fromNow();              // '10 years ago'
tick('2027-10-04')->fromNow();              // 'in 3 years'
tick('2014-10-01')->fromNow(true);          // '10 years' (no ago/in)

tick('2014-10-01')->from('2015-10-01');     // '1 year ago'
tick('2015-10-01')->from('2014-10-01');     // 'in 1 year'
tick('2014-10-01')->from('2015-10-01', true); // '1 year' (no ago/in)
```

### Comparisons

```php
tick()->isBefore('2011-01-01');
tick()->isSame(new \DateTime('2011-01-01'));
tick()->isAfter('2011-01-01');

tick('2010-10-20')->isBetween('2010-10-19', new \DateTime('2010-10-25'));
tick('2010-10-20')->isBetweenOrEqual('2010-10-19', new \DateTime('2010-10-25'));
tick('2010-10-20')->isSameDay('2010-10-20');
tick('2010-10-20')->isSameMonth('2010-10-20');
tick('2010-10-20')->isSameYear('2010-10-20');
tick('2000-01-01')->isLeapYear();          // true
tick()->isDateTime('2000-01-01');          // false
```
