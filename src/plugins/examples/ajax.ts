import Iris from '@/core/iris';

interface IRequestOptions {
  method: 'GET' | 'POST' | 'HEAD' | 'PUT' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH' | 'DELETE';
  url: string;
  data: any;
}

interface IResponse {
  data: any;
  status: number;
  url: string;
}

class Ajax extends Iris.Plugin {
  request(options: IRequestOptions): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      var xhttp = new XMLHttpRequest();
  
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          resolve({
            data: JSON.parse(this.responseText),
            status: this.status,
            url: this.responseURL
          });
        }
      };
  
      xhttp.open(options.method, options.url, true);
      xhttp.send();
    })
  }

  injectIntoComponent() {
    return {
      $ajax: {
        request: this.request
      }
    }
  }
}

export default Ajax;
