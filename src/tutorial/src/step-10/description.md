# Inserting data into a database

In the previous section, we looked at how to use raw queries using the `query()` method. Although the `query()` method is powerful, it is not the most convenient way to make simple queries. In this section, we will look at Leaf's query builder and how to use it to insert data into a database.

## Adding data to a database

 we use Leaf DB's `insert()` method. This method takes a table name as its first argument and returns a query builder. The query builder has a number of methods that we can use to build our query. The first method we'll look at is `params()`. This method takes a dictionary of column names and values to insert. Let's look at an example:

To add a new record to a database, we use Leaf Db's insert method. This method needs the name of the table you want to add data to, like "users", and then it allows you to build the rest of your query from there.

One important part of this tool is the `params()` method, which lets you specify the data you want to add as a list of column names and values. Here's an example:

```php
db()->insert('users')->params(['username' => 'mychi']);
```

This is equivalent to the following SQL query:

```sql
INSERT INTO users (username) VALUES ('mychi')
```

Of course, it automatically takes care of parameter binding, which is important for preventing SQL injection attacks. Now that we have our query, we can execute it using the `execute()` method. Here's an example:

```php
db()
  ->insert('users')
  ->params(['username' => 'mychi'])
  ->execute();
```

One beautiful thing is that although you pass a dictionary to the `params` method, Leaf would automatically use parameter binding on your values. This is very important because it prevents SQL injection attacks.

## YOUR TASK

We've carried over the solution from the last section. Your task this time is to replace the raw `INSERT` statement with Leaf's query builder. The raw SQL looks like this:

```sql
INSERT INTO users (name, email)
VALUES
  ('John Doe', 'johndoe@test.com')
```

Using the `insert` method, build the query and execute it. You can use the `execute` method to execute the query as done in the example above. This solution should be done at the section with `// 1. New insert query here`.
