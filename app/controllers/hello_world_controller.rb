# frozen_string_literal: true

class HelloWorldController < ApplicationController
  layout "hello_world"

  def index
    @memory_props = Memory.all.as_json(:only => [:top, :left, :text, :image])
  end
end
