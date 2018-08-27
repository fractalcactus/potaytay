Rails.application.routes.draw do
  resource :memory, only: [:show]
  root "memory#show"
end
