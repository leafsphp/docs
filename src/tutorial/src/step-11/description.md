# Reading items in a database

We have looked at how to write raw SQL, and we've also looked at how to insert data into a database using Leaf's query builder. In this section, we will look at how to read data from a database using Leaf's query builder.

## The select method

In SQL, the `SELECT` statement is used to read data from a database. Leaf DB provides a `select()` method that allows you to build a `SELECT` statement with all its intricacies.

`select()` takes in 2 parameters:

- The name of the table you want to read from
- The columns you want to read (optional)

Let's look at a few examples:

```php
db()->select('users')->all();

// SELECT * FROM users
```

This query returns everything in our users table. We can also specify the columns we want to select:

```php
db()->select('users', 'name, created_at')->all();

// SELECT name, created_at FROM users
```

We added `all()` to the end of our query to execute it. This method returns all the rows in the table. We can also use `fetchObj()` to return the result as an object just as we saw in the previous section.

## Conditional queries

There are many cases where we need to read data based on certain conditions. Leaf DB provides a `where()` method to help us with this.

It takes a column name, an operator and a value as its arguments. You can also pass in an array of column names and values. Let's look at an example:

```php
db()
  ->select('users')
  ->where('name', 'John Doe')
  ->fetchObj();

# or

db()
  ->select('users')
  ->where(['name' => 'John Doe'])
  ->fetchObj();
```

</div>

## YOUR TASK

We've carried over the solution from the last section. Your task this time is to replace the raw `SELECT` statement with Leaf's query builder. The raw SQL looks like this:

```sql
SELECT * FROM users WHERE age = 20
```

Using the `select()` method, build the query and execute it. This solution should be done at the section with `// 1. New select query here`.
