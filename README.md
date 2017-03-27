# Blog

To start your Phoenix app:

  * Install dependencies with `mix deps.get && yarn`
  * Run docker continer for postgres in developement `docker run --name blog_postgres -h blog_postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres:latest`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Start Phoenix endpoint with `mix phoenix.server`
  * For front-end dev `yarn dev`

Now you can visit [`localhost:4000`](http://localhost:4000) ([`localhost:8080`](http://localhost:8080) for front-end) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
