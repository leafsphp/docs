---
title: "Leaf Date"
---

<!-- markdownlint-disable no-inline-html -->
# 📆 Leaf Date

Leaf Date makes formating date/time really easier, though the method names may appear weird, they're actually very easy to remeber😂

<div class="alert -info">
All date methods are now static and can be called from anywhere within your app.
</div>

```php
use Leaf\Date;

Date::now();
```

<br>

You can also use the date object directly on the Leaf object.

```php
$app = new Leaf\App;

$app->date;
```

After this, all the Date methods will be available to us:

## Date Methods

Basically, Date just gives you methods to manipulate the date and time, faster and simpler than `DateTime()` would allow. Let's take a look at these methods.

### randomTimestamp

randomTimestamp as the name implies, generates a new random timestamp. This method was Timestamp in the previous version.

```php
$timestamp = Date::randomTimestamp();
```

randomTimestamp is already configured to give a wide range of dates, but if you ever feel like customizing this range, just pass in params for randomTimestamp

```php
Date::randomTimestamp($start, $end);
```

### randomDate

random_date as the name implies, generates a new random date.

```php
$timestamp = Date::randomDate();
```

Just like randomTimestamp, randomDate is already configured with a wide range of dates, but you can set a specific range with:

```php
Date::randomDate($start, $end);
```

### getTimezone

This method returns the current time zone of the user

```php
$timeZone = Date::getTimezone();
```

### setTimezone

This method sets the timezone sets the timezone of the user. This method takes in one optional parameter, which is the timezone to set. If nothing is passed in there, the timezone is set to a GMT timezone.

```php
$timeZone = Date::setTimezone('Timezone');
```

You can get a list of all PHP supported timezones [here](https://www.w3schools.com/php/php_ref_timezones.asp)

### rawDate

Format a local time/date

```php
$date = Date::rawDate(time(), "D, d M Y H:i:s");

$date = Date::rawDate(time());
```

### now

now returns the timestamp of the current date and time. Now will return the date based on the timezone, therefore, it is recommended to use now together with `setTimeZone`

```php
Date::setTimeZone('Africa/Accra');
$timezone = Date::now();
```

### daysAgo

This is used to get the date from some days ago.

```php
$now = Date::now(); // returns 2020-04-15 05:21:43 pm
Date::daysAgo(2); // returns 2020-04-13
```

You can also pass in a particular date as a second parameter. This will be the date to start counting from.

```php
echo Date::daysAgo(10, "2020-04-13"); // returns 2020-04-03
```

### monthsAgo

This is used to get the date from some months ago.

```php
$now = Date::now(); // returns 2020-04-15 05:21:43 pm
Date::monthsAgo(2); // returns 2020-02-15
```

You can also pass in a particular date as a second parameter. This will be the date to start counting from.

```php
echo Date::monthsAgo(10, "2020-04-13"); // returns 2019-06-13
```

### yearsAgo

This is used to get the date from some years ago.

```php
$now = Date::now(); // returns 2020-04-15 05:21:43 pm
Date::yearsAgo(2); // returns 2018-04-15
```

You can also pass in a particular date as a second parameter. This will be the date to start counting from.

```php
echo Date::yearsAgo(10, "2020-04-13"); // returns 2010-04-13
```

### toDate

This method gets the date in `YYYY-MM-DD` format from an existing timestamp

```php
$parsedDate = Date::toDate($timestamp);
```

### toEnglishDate

This gets the date in the format (MM DD, YYYY) from an existing timestamp

```php
$parsedDate = Date::toEnglishDate($timestamp);
```

### toEnglishTs

This gets the date in the format `(DD MM, YYYY HH:MM:SS)` from a timestamp

```php
$parsedDate = Date::toEnglishTs($timestamp);
```

### toTime

This gets the time in the format `(HH:MM:SS)` from a timestamp

```php
$parsedDate = Date::toTime($timestamp);
```

### format

Format a timestamp based on your own rules

```php
$parsedDate = Date::format($timestamp, "d-m-Y");
```

### intToMonth

This gets the month in words from a number (1-12)

```php
$month = Date::intToMonth($number);
```

### intToDay

This gets the day in words from a number (1-7)

```php
$month = Date::intToDay($number);
```

### day

Get current day

```php
$date = Date::day();
```

### month

Get current month

```php
$month = Date::month();
```

### year

Get current year

```php
$year = Date::year();
```
