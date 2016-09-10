defmodule KatashinInfo.Api.V1.PageView do
  use KatashinInfo.Web, :view

  def render("page.json", %{page: page}) do
    %{page_number: page.page_number, page_size: page.page_size,
      total_pages: page.total_pages, total_entries: page.total_entries}
  end
end
