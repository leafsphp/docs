# Tick

Working with PHP dates can be challenging due to various date formats, handling different time zones, and tricky date calculations which are actually quite common. These issues can lead to inconsistencies if not managed carefully, and can be a source of bugs in your application.

Leaf provides a minimalistic module that provides a simple and clean API for working with dates in PHP. It is 100% compatible with PHP's native `DateTime` class, but offers a more fluent and expressive API inspired by Day.js.

```php
tick()->now(); // get the current timestamp
tick()->format('YYYY-MM-DD'); // format the current timestamp
tick()
  ->startOf('month')
  ->add(1, 'day')
  ->set('year', 2018)
  ->format('YYYY-MM-DD HH:mm:ss');
```

## Setting up

To get started with Tick, you need to install it using the Leaf CLI:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install tick
```

```bash:no-line-numbers [Composer]
composer require leafs/tick
```

:::

Once installed, you can start using Tick in your application.

## Parsing Dates

You probably noticed the `tick()` function in the examples above. This function is the entry point for Tick and initializes a date for manipulation or formatting. You can pass a date string, a timestamp, or a `DateTime` object to the `tick()` function.

```php
tick(); // will use today's date
tick('2018-01-01 12:00:00'); // create a date from a string

$date = new DateTime('2018-01-01 12:00:00');
tick($date); // create a date from a DateTime object
```

Tick is versatile and smart enough to handle dates correctly, so you can pass in any valid date string or timestamp and it will work as expected.

## Getting and Setting Dates

Tick provides methods for getting and setting various parts of a date, such as the year, month, day, hour, minute, second, and millisecond. This uses a syntax where the same function can be used to get or set a value.

```php
tick()->second(30); // set the second to 30
tick()->second(); // get the second
```

This works for all parts of a date, including the year, month, day, hour, minute, second, and millisecond.

```php
tick()->year(2018); // set the year to 2018
tick()->year(); // get the year

tick()->month(); // gets current month
tick()->month(0); // returns new tick object

tick()->day(); // gets day of current week
tick()->day(0); // returns new tick object

tick()->date(); // gets day of current month
tick()->date(1); // returns new tick object

tick()->hour(); // gets current hour
newDate = tick()->hour(12); // returns new tick object

tick()->minute(); // gets current minute
tick()->minute(59); // returns new tick object

tick()->second(); // gets current second
tick()->second(1); // returns new tick object

tick()->millisecond(); // gets current millisecond
tick()->millisecond(1); // returns new tick object
```

You can also use the `get()` and `set()` methods to get and set values.

```php
tick()->get('year'); // get the year
tick()->set('year', 2018); // set the year to 2018
```

### List of all available units

<!-- 3 column table populated with the data above -->
| Unit | Shorthand | Description |
| ----- | -------- | ----------- |
| date | D | Date of Month |
| day | d | Day of Week (Sunday as 0, Saturday as 6) |
| month | M | Month (January as 0, December as 11) |
| year | y | Year |
| hour | h | Hour |
| minute | m | Minute |
| second | s | Second |
| millisecond | ms | Millisecond |

## Manipulating Dates

This is a fancy way of saying "changing dates" into some other kind of date. Tick provides straightforward methods for adding, subtracting, setting, and manipulating dates in various ways.

*All manipulation methods return a new Tick object, so you can chain them together.*

```php
tick()->add(1, 'day')->format('YYYY-MM-DD');
```

## Adding and Subtracting Dates

Tick allows you to add time to a date using the `add()` method. You can add any number of years, months, days, hours, minutes, seconds, or milliseconds to a date.

```php
tick()->add(1, 'day');
tick()->add(1, 'week');
```

You can also subtract time from a date using the `subtract()` method.

```php
tick()->subtract(1, 'day');
tick()->subtract(1, 'week');
```

This is a list of all available units that can be used with the `add()` and `subtract()` methods:

| Unit          | Shorthand | Description                              |
| ------------- | --------- | ---------------------------------------- |
| `day`         | `d`       | Day                                      |
| `week`        | `w`       | Week                                     |
| `month`       | `M`       | Month                                    |
| `year`        | `y`       | Year                                     |
| `hour`        | `h`       | Hour                                     |
| `minute`      | `m`       | Minute                                   |
| `second`      | `s`       | Second                                   |
| `millisecond` | `ms`      | Millisecond                              |

## Getting the start/end of a unit

You can get the start of a unit using the `startOf()` method. This method sets the date to the start of the specified unit, such as the start of the day, month, or year. For example, to get the first day of the month or the first day of the year, you can use the following code:

```php
tick()->startOf('month'); // => 2024-10-01 00:00:00
tick()->startOf('year'); // => 2024-01-01 00:00:00
```

You can also use the `endOf()` method to get the end of a unit. This method sets the date to the end of the specified unit, such as the end of the day, month, or year. For example, to get the last day of the month or the last day of the year, you can use the following code:

```php
tick()->endOf('month'); // => 2024-10-31 23:59:59
tick()->endOf('year'); // => 2024-12-31 23:59:59
```

These methods are useful for getting the start or end of a unit when you need to perform calculations or comparisons based on the start or end of a unit.

The following units are available for use with the `startOf()` and `endOf()` methods:

| Unit          | Shorthand | Description                              |
| ------------- | --------- | ---------------------------------------- |
| `year`        | `y`       | January 1st, 00:00 this year             |
| `month`       | `M`       | the first day of this month, 00:00       |
| `week`        | `w`       | the first day of this week, 00:00 (locale aware) |
| `date`        | `D`       | 00:00 today                              |
| `day`         | `d`       | 00:00 today                              |
| `hour`        | `h`       | now, but with 0 mins, 0 secs, and 0 ms   |
| `minute`      | `m`       | now, but with 0 seconds and 0 milliseconds |
| `second`      | `s`       | now, but with 0 milliseconds             |

## Formatting Dates

Formatting dates is a common task when working with dates in PHP. Formatting a date allows you to display the date in a specific format, such as `YYYY-MM-DD` or `DD/MM/YYYY`. Tick provides a `format()` method that allows you to format a date using a format string.

```php
tick()->format();
// '2024-10-03T18:04:37+00:00'
// current date in ISO8601, without fraction seconds

tick('2019-01-25')->format('DD/MM/YYYY'); // '25/01/2019'
```

You can combine various format tokens to create a custom date format. The following format tokens are available for use with the `format()` method:

| Format | Output | Description                              |
| ------ | ------ | ---------------------------------------- |
| `YY`   | `70`   | Two-digit year                           |
| `YYYY` | `1970` | Four-digit year                          |
| `M`    | `1-12` | The month, beginning at 1                |
| `MM`   | `01-12` | The month, 2-digits                      |
| `MMM`  | `Jan-Dec` | The abbreviated month name               |
| `MMMM` | `January-December` | The full month name |
| `D`    | `1-31` | The day of the month                     |
| `DD`   | `01-31` | The day of the month, 2-digits           |
| `d`    | `0-6`  | The day of the week, with Sunday as 0    |
| `dd`   | `Su-Sa` | The min name of the day of the week      |
| `ddd`  | `Sun-Sat` | The short name of the day of the week   |
| `dddd` | `Sunday-Saturday` | The name of the day of the week |
| `H`    | `0-23` | The hour                                 |
| `HH`   | `00-23` | The hour, 2-digits                       |
| `h`    | `1-12` | The hour, 12-hour clock                  |
| `hh`   | `01-12` | The hour, 12-hour clock, 2-digits        |
| `m`    | `0-59` | The minute                               |
| `mm`   | `00-59` | The minute, 2-digits                     |
| `s`    | `0-59` | The second                               |
| `ss`   | `00-59` | The second, 2-digits                     |
| `SSS`  | `000-999` | The millisecond, 3-digits              |
| `Z`    | `+01:00` | Offset from UTC, e.g. +01:00             |
| `ZZ`   | `+0100` | Offset from UTC, e.g. +0100              |
| `A`    | `AM`   | AM, PM                                   |
| `a`    | `am`   | am, pm                                   |

Anything you pass into the `format()` method will be formatted according to the format string you provide. If you want to ignore parts of information you pass into the `format()` method, you can wrap them in square brackets.

```php
tick('2019-01-25')->format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]');
// 'YYYYescape 2019-01-25T00:00:000Z'
```

YYYYescape got ignored instead of turning into a year. This is powerful, especially when you want to include some text in your date format.

## Time from now

You can get how far a date is from now using the `fromNow()` method. This method returns a string that represents the difference between the date and the current date in a human-readable format.

```php
tick('2014-10-01')->fromNow(); // 10 years ago
tick('2027-10-04')->fromNow(); // in 3 years
```

If you want to remove the suffix (ago or in), you can pass `true` as the first argument to the `fromNow()` method.

```php
tick('2014-10-01')->fromNow(true); // 10 years
tick('2027-10-04')->fromNow(true); // 3 years
```

## Time from a date

If you want to check how much time has passed since a specific date, you can use the `from()` method. This method returns a string that represents the difference between the date and the specified date in a human-readable format.

```php
tick('2014-10-01')->from('2015-10-01'); // 1 year ago
tick('2015-10-01')->from('2014-10-01'); // in 1 year
```

If you want to remove the suffix (ago or in), you can pass `true` as the first argument to the `from()` method.

```php
tick('2014-10-01')->from('2015-10-01', true); // 1 year
tick('2015-10-01')->from('2014-10-01', true); // 1 year
```

## Querying Dates

Querying dates allows you to check relationships between dates, such as whether a date is before or after another date. Tick provides methods for querying dates, such as `isBefore()`, `isAfter()`, and `isSame()`.

### Is Before

This indicates whether the Tick object is before the other supplied date-time.

```php
tick()->isBefore('2011-01-01');
```

### Is Same

This indicates whether the Tick object is the same as the other supplied date-time.

```php
tick()->isSame(new \DateTime('2011-01-01'));
```

### Is After

This indicates whether the Tick object is after the other supplied date-time.

```php
tick()->isAfter('2011-01-01');
```

### Is Between

This indicates whether the Tick object is between two other supplied date-time.

```php
tick('2010-10-20')
  ->isBetween('2010-10-19', new \DateTime('2010-10-25'));
```

### Is Between Or Equal

This indicates whether the Tick object is between two other supplied date-time or equal to one of them.

```php
tick('2010-10-20')
  ->isBetweenOrEqual('2010-10-19', new \DateTime('2010-10-25'));
```

### Is same day

This indicates whether the Tick object is the same day as the other supplied date-time.

```php
tick('2010-10-20')->isSameDay('2010-10-20');
```

### Is same month

This indicates whether the Tick object is the same month as the other supplied date-time.

```php


tick('2010-10-20')->isSameMonth('2010-10-20');
```

### Is same year

This indicates whether the Tick object is the same year as the other supplied date-time.

```php
tick('2010-10-20')->isSameYear('2010-10-20');
```

### Is Leap Year

This indicates whether the Tick object's year is a leap year or not.

```php
tick('2000-01-01')->isLeapYear(); // true
```

### Is DateTime

This indicates whether the Tick object is a DateTime object or not.

```php
tick()->isDateTime('2000-01-01'); // false
```
