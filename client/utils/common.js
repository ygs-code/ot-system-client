
export const importScript = ((oHead, self) => sSrc =>
  new Promise((resolve, reject) => {
    if (self.__cacheImportScript__ && self.__cacheImportScript__[sSrc]) {
      resolve()
    } else {
      var oScript = document.createElement('script')
      oScript.type = 'text/javascript'
      oScript.charset = 'utf-8'
      oScript.onerror = () => {
        reject(new URIError('The script ' + sSrc + ' is not accessible.'))
      }
      oScript.onload = () => {
        if (!self.__cacheImportScript__) {
          self.__cacheImportScript__ = {}
        }
        self.__cacheImportScript__[sSrc] = sSrc
        resolve()
      }
      oHead.appendChild(oScript)
      oScript.src = sSrc
    }
  }))(document.head || document.getElementsByTagName('head')[0], window)
