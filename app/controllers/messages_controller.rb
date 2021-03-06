class MessagesController < ApplicationController
  before_action :set_group
  before_action :index_variables, only:[:index, :create]

  def index
    @message = Message.new
    respond_to do |format|
      format.html
      format.json
    end
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      flash.now[:notice] = "メッセージを投稿しました"
      respond_to do |format|
        format.html{ redirect_to "group_messages_path(params[:group_id])" }
        format.json
      end 
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def index_variables
    @groups = current_user.groups.order(created_at: :DESC)
    @group = Group.find(params[:group_id])
    @users = @group.users
    @message =@group.messages.order(created_at: :DESC).includes(:user)
  end
end