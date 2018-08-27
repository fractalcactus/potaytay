Rails.application.routes.draw do
  resource :user, only: [:index]
  root "user#index"
end
