# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :katashin_info,
  ecto_repos: [KatashinInfo.Repo]

# Configures the endpoint
config :katashin_info, KatashinInfo.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "LzOmTg5IqdU7pq7iBSgtXUKEuDg6ZjJDiQu4K8Uw749u6GtHh0dXlN/FE2XD9PuY",
  render_errors: [view: KatashinInfo.ErrorView, accepts: ~w(html json)],
  pubsub: [name: KatashinInfo.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
