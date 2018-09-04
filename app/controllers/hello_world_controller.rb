# frozen_string_literal: true

class HelloWorldController < ApplicationController
  http_basic_authenticate_with name: ENV["USERNAME"], password: ENV["PASSWORD"]
  layout "hello_world"

  def index
    @memory_props = Memory.all.as_json(:only => [:top, :left, :text, :image])
  end
end
