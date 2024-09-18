# Updating items in a database

If you've been following along, you should have a good understanding of how to insert and read data from a database using Leaf's query builder. In this section, we will look at how to update data in a database using Leaf's query builder.

## Basic updates

Let's say we have a users table which has a couple of columns like `name`, `email`, and `age`. To update a record in this table, we use Leaf DB's `update()` method. It takes in the name of the table that's holding the data we want to update. From there, we have to tell Leaf which columns we want to update and what we want to update them to. We can do this using the `params()` method we saw in [part 10](/tutorial/#step-10). Here's an example:

```php
db()
  ->update('users')
  ->params(['name' => 'Jane Doe'])
  ->execute();
```

This is equivalent to the following SQL query:

```sql
UPDATE users SET name = 'Jane Doe'
```

This query updates all records in the users table with the name `Jane Doe`, which is not what we want. To update a specific record, we need to add a `WHERE` clause to our query.

## Where clauses

We saw how to use the `where()` method in [part 11](/tutorial/#step-11) to read data based on certain conditions. Where clauses allow us to filter data based on certain conditions, which is what we want to do to our example above. Let's say we only want to update the record with the name `Jaen Doe` because she made a typo in her name. We can do this by adding a `WHERE` clause to our query. Here's how:

```php{4}
db()
  ->update('users')
  ->params(['name' => 'Jane Doe'])
  ->where('name', 'Jaen Doe')
  ->execute();
```

This will find the record with the name `Jaen Doe` and update it to `Jane Doe`. This is equivalent to the following SQL query:

```sql
UPDATE users SET name = 'Jane Doe' WHERE name = 'Jaen Doe'
```

## YOUR TASK

We've prepared this SQL query for you to replace with Leaf's query builder. The raw SQL looks like this:

```sql
UPDATE users SET name = 'Jane Doe' WHERE name = 'Jaen Doe' AND email = 'jane@example.com'
```

Using the `update()` and `where()` methods, build the equivalent of this SQL query and execute it.
This solution should be done at the section with `// 1. New update query here`.
