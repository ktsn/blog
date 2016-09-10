defmodule KatashinInfo.Repo do
  use Ecto.Repo, otp_app: :katashin_info
  use Scrivener, page_size: 10
end
