import Vue from 'vue'
import Routers from './router.js'
import axios from 'axios'
import { vuexModules, rootModules } from './vuex/export.index.js'

import SidelipPage from './components/sidelipPage/index.js'
import PageModal from './components/pageModal/index.js'
import BrowseImage from './components/browseImage/index.js'
import RowTools from './components/RowTools.vue'
import FormBlock from './components/formBlock/index.vue'
import PageTable from './components/PageTable.vue'
import Format from './components/Format.vue'
import FlexFields from './components/flexFields/FlexFields.vue'
import SidebarMenu from './components/sidebarMenu/SidebarMenu.vue'
import ImgUpload from './components/upload/ImgUpload.vue'
import Locales from './lang/index.js'
import SelectOrg from "./components/selectOrg/SelectOrg.vue";
import SelectValueSet from "./components/valueSet/SelectValueSet.vue";

let components = {
  RowTools,
  FormBlock,
  PageTable,
  SidebarMenu,
  ImgUpload,
  Format,
  FlexFields,
  SelectOrg,
  SelectValueSet,
}

const install = function (Vue, option) {
  Vue.prototype.$App = Object.assign({}, (!!option && !!option.app) ? option.app : {});
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key]);
  });
  Vue.prototype.$sidelipPage = SidelipPage;
  Vue.prototype.$pageModal = PageModal;
  Vue.prototype.$BrowseImage = BrowseImage;

  //文件下载通用方法
  Vue.prototype.DownloadFile = (param = {}, vue) => {
    return new Promise((resolve) => {
      vue.$Spin.show({
        render: (h) => {
          return h('div', [
            h('Icon', {
              'class': 'demo-spin-icon-load',
              props: {
                type: 'load-c',
                size: 18
              }
            }),
            h('div', '正在努力下载附件，请稍候...')
          ])
        }
      });
      axios({
        method: param.method || 'get',//方法
        url: `${process.env.API.baseURL}${param.url}`,//地址
        responseType: 'blob',
        headers: {
          crctoken: sessionStorage.crctoken
        },
        data: param.data || {}
        }).then(response => {
          if (!response.data) {
            return
          }
          let url = window.URL.createObjectURL(new Blob([response.data]));
          let _fileName = response.headers['content-disposition'].split("=");
          let fileName = param.name || (!!_fileName && _fileName.length > 1 ? _fileName[1] : 'file');
          //兼容IE10+、edge
          if (window.URL.createObjectURL(new Blob()).indexOf(location.host) < 0) {
            if (window.navigator.msSaveOrOpenBlob) {//IE10+方法
              const blobObject = new Blob([response.data], {type: 'text/html'});
              window.navigator.msSaveOrOpenBlob(blobObject, decodeURI(fileName));
            }
          //兼容chrome、fireFox
          }else{
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', decodeURI(fileName))
            document.body.appendChild(link)
            link.click()
          }
          vue.$Spin.hide();
            resolve({
                msg : "导出成功"
            })
        })
      })
    }
  }

//   Vue.prototype.DownloadFile = (param = {}, vue) => {
//     return new Promise((resolve) => {
//       vue.$Spin.show({
//         render: (h) => {
//           return h('div', [
//             h('Icon', {
//               'class': 'demo-spin-icon-load',
//               props: {
//                 type: 'load-c',
//                 size: 18
//               }
//             }),
//             h('div', '正在努力下载附件，请稍候...')
//           ])
//         }
//       });
//       axios({
//         method: param.method || 'get',//方法
//         url: `${process.env.API.baseURL}${param.url}`,//地址
//         responseType: 'blob',
//         headers: {
//           crctoken: sessionStorage.crctoken
//         },
//         data: param.data || {}
//       }).then((response) => {
//         let a = document.createElement('a');
//         let url = window.URL.createObjectURL(response.data);
//         // if(!response.headers['content-disposition']){
//         //   return
//         // }
//         let _fileName = response.headers['content-disposition'].split("=");
//         let filename = param.name || (!!_fileName && _fileName.length > 1 ? _fileName[1] : 'file');
//         a.href = url;
//         a.download = decodeURIComponent(filename);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         vue.$Spin.hide();
//         resolve();
//       });
//     })
//   }
// }

let system = Object.assign({}, { install })
let systemRouter = Routers;
let routerEvent = {
  beforeEach(to, from, next) {
    if (!!sessionStorage.getItem('OAM_REMOTE_USER') && !sessionStorage.crctoken && to.name !== 'transfers') {
      next({
        name: 'transfers'
      })
    } if (!sessionStorage.crctoken && to.name !== 'login' && !sessionStorage.getItem('OAM_REMOTE_USER')) {
      next({
        name: 'login'
      });
    } else if (sessionStorage.crctoken && to.name === 'login') {
      next(false);
    } else {
      if (`home_index,ownspace_index,login,locking,feedback,personalPreferences,${Vue.prototype.$App.home ? Vue.prototype.$App.home.name : ''}`.indexOf(to.name) >= 0) {
        next();
      } else if (to.name == 'transfers' && !!sessionStorage.getItem('OAM_REMOTE_USER')) {
        next();
      }
      else if (!window.$store && !sessionStorage.scopeUrl) {
        next({
          name: 'home_index'
        });
      } else {
        next((!!window.$store && $store.state.scopeUrl.indexOf(to.name) >= 0) || (sessionStorage.scopeUrl.indexOf(to.name) >= 0));
      }
    }
  }
}
export {
  system,
  systemRouter,
  vuexModules,
  rootModules,
  routerEvent,
  Locales
}



