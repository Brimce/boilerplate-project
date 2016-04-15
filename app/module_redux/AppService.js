import LoaderVM from './loader/LoaderVM'
import ErrorVM from './error/ErrorVM'

 export default class AppService{
  static ShowLoading()
  {
    return LoaderVM.showLoading()
  }

  static HideLoading(){
    return LoaderVM.hideLoading()
  }

  static ShowError(message, retryAction){
   return ErrorVM.showError(message, retryAction)
  }
}
