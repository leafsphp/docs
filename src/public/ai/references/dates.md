# Dates & Time — `tick()` (leafs/date)

Leaf's date library follows **dayjs semantics** — dayjs format tokens, dayjs method names, immutable-style chaining. It is NOT Carbon and NOT php `date()`.

```php
tick();                                    // now
tick('2026-01-15 12:00:00');               // parse a date string
tick($str, 'Asia/Tokyo');                  // parse as wall-clock time IN that zone
tick($utc, 'UTC')->tz('America/New_York'); // tz() CONVERTS an existing instant to another zone
tick()->utc();                             // convert to UTC (store dates in UTC)
tick()->utcOffset();                       // minutes from UTC
```

Calendar flow: parse in the user's zone → `->utc()` to store → `->tz(viewerZone)` to render.

## Formatting

```php
tick()->format('YYYY-MM-DD HH:mm:ss');     // dayjs tokens, NOT php date() tokens
tick()->format('MMM D, YYYY');             // Jan 15, 2026
tick($date)->fromNow();                    // "2 hours ago"
tick($date)->from($otherDate);             // relative between two dates
tick()->toDateString();                    // 2026-01-15
tick()->toDateTimeString();                // 2026-01-15 12:00:00
tick()->toIsoString();                     // ISO 8601
tick()->toTimestamp();                     // unix timestamp (int)
tick()->toDateTime();                      // native \DateTime when you need one
```

Common token trap: `YYYY-MM-DD`, `HH:mm:ss`, `ddd`/`dddd` for weekday names. `Y-m-d` and friends are php tokens and will render wrong.

## Manipulation

```php
tick()->add(3, 'days');
tick()->subtract(1, 'month');
tick()->startOf('day');                    // also: week, month, year, hour...
tick()->endOf('month');
tick()->set('hour', 9);
tick()->get('month');
tick()->year(2027);                        // getter with no arg, setter with one
```

## Comparison

```php
tick($a)->isBefore($b);
tick($a)->isAfter($b);
tick($a)->isSame($b);
tick($a)->isSameDay($b);                   // also isSameMonth, isSameYear
tick($a)->isBetween($b, $c);               // and isBetweenOrEqual
tick()->isLeapYear();
```

## Numeric differences (5.1+)

`diff()` returns a signed integer, dayjs style: positive when this date is after the argument, truncated toward zero. Days and months are calendar-aware, so night counts survive DST boundaries.

```php
tick($checkOut)->diff($checkIn, 'days');   // nights in a booking — 4, not 3.958
tick($expiry)->diff('now', 'hours');
tick($b)->diff($a, 'months');              // units: years|months|days|hours|minutes|seconds
```

It accepts strings, `DateTime`, or another `tick()` instance.

## With Eloquent models (MVC)

Model `date`/`timestamp` casts return **Carbon** instances (Eloquent's own library), not `tick()` objects — `$booking->check_in->endOf('day')` on a model date is Carbon API, not this one. Use `tick()` in the layers you control (services, queries, formatting): `tick()->format('YYYY-MM-DD')` for query bounds, `tick($model->check_in->toDateTimeString())` to bring a model date into tick when you need its API.

Stored `date` columns hold `YYYY-MM-DD HH:MM:SS` — compare with `whereDate()`, not `where()`, or exact boundary dates misbehave (see mvc.md).
