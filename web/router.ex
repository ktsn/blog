defmodule KatashinInfo.Router do
  use KatashinInfo.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/admin", KatashinInfo do
    pipe_through :browser

    Enum.each [
      "/",
      "/articles", "/articles/:id", "/articles/new",
      "/login"
    ], fn path ->
      get path, AdminController, :index
    end
  end

  scope "/api", KatashinInfo.Api do
    pipe_through :api

    scope "/v1", V1 do
      resources "/articles", ArticleController, except: [:new, :edit]

      post "/login", AuthController, :login, as: :login
      delete "/logout", AuthController, :logout, as: :logout
    end
  end
end
