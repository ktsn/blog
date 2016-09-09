defmodule KatashinInfo.Router do
  use KatashinInfo.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/admin", KatashinInfo do
    pipe_through :browser

    get "/", AdminController, :index
  end

  scope "/api", KatashinInfo.Api do
    pipe_through :api

    scope "/v1", V1 do
      resources "/articles", ArticleController, except: [:new, :edit]
    end
  end
end
