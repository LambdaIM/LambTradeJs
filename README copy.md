# AlleriaJSSDK
用于生成艺术，创建项目、修改项目信息，使用AlleriaJSSDK可以轻松管理生成艺术项目，可以很方便的进行创建项目、编辑项目信息、设置mit信息和编辑mit信息

## 1 通过npm 或yarn 安装 @webfans/alleriajssdk
```
npm install  @webfans/alleriajssdk
```
```
yarn add  @webfans/alleriajssdk
```
## 2 生成api文档
```
npm install
npm run doc
```
生成的文档在out文件夹下
可以本地启动一个server 查看
安装serve 可以方便查看  https://www.npmjs.com/package/serve


## 3 初始化
account 为当前钱包链接的账户，
chianid 当前钱包链接网络的 chian id

 在浏览器端，钱包位小狐狸插件初始化
```
import sdk from '@webfans/alleriajssdk'
let sdkobj = new sdk(window.ethereum,account,chianid)
```
在浏览器端，使用walletconnect 

```
import sdk from '@webfans/alleriajssdk'
let rpcurl=""//http 的rpc接口
let sdkobj = new sdk(rpcurl,account,chianid)
```
在node 端，使用 
传入 Signer
```
import sdk from '@webfans/alleriajssdk'
const ethers = require('ethers');
let  WALLET = new ethers.Wallet(testconfig.PRIVATE_KEY);//WALLET 为Signer

let  RpcProvider =new ethers.providers.JsonRpcProvider(testconfig.rpcurl)
WALLET=WALLET.connect( RpcProvider)

let sdkobj = new sdk(WALLET,account,chianid)
```

如果需要传递 合约的配置地址
```
let contractConfig={
        "92001":{
            "Alleria":"0x6442e640fCAA5ebaA1b6F377741f5BD35c0BAb7F",
            "MinterSetPrice":"0x09D385e8e35Bd65a12848B155fCBC2C5b7fC9bCB",
            "MinterFilter": "0xe05b026b02d1310E850B53120e9B93bAb549Be41"
        }
      }

let sdkobj = new sdk(window.ethereum,account,chianid,contractConfig)
```

## 4 艺术家操作项目相关的操作
### 1 添加一个项目
首先 任何人都可以添加项目，创建项目填写的信息之后都可以修改，
添加相关有关的参数有

projectName 项目名称

lambHash 上传到lambda网络后的资源代码或者文件, 返回的唯一标识，如果创建项目的时候还没有上传文件，可以先为空，之后在修改

projectLicense 项目license

projectWebsite 项目网站

projectDescription 项目介绍

tags 项目标签

aspectRatio 项目比例
```
var result = await sdkobj.Alleria.addProject({ projectName:'mying',lambHash:'',
        projectLicense:'License',projectWebsite:'www',projectDescription:'xxxxxx',tags:'11 222',aspectRatio:'22'})
      console.log('result',result)
```

### 2 修改项目名称
```
let data = await sdkobj.Alleria.updateProjectName(projectid,'name')
```
### 3 修改项目简介
```
let data = await sdkobj.Alleria.updateProjectDescription(projectid,'Description')
```
### 4 修改项目网址
```
let data = await sdkobj.Alleria.updateProjectWebsite(projectid,'Website')
```

### 5 修改项目License

```
let data = await sdkobj.Alleria.updateProjectLicense(projectid,'License')
```
### 6 修改项目的标签
```
let data = await sdkobj.Alleria.updateProjectTags(projectid,'Tags')
```
### 7 修改项目的Ratio

```
let data = await sdkobj.Alleria.updateProjectAspectRatio(projectid,200)
```

### 8 查看tokenid对应的url

```
let data = await sdkobj.Alleria.tokenURI(tokenid)
```
### 9 查看项目信息
```
let data = await sdkobj.Alleria.projectInfo(projectid)
```

### 10 查看项目详情
```
let data = await sdkobj.Alleria.projectDetails(projectid)
```

### 10 查看拥有 nft 的数量

```
let data = await sdkobj.Alleria.balanceOf()
```
### 10 查看拥有 nft 的token列表
```
let data = await sdkobj.Alleria.listToken()
```
## 5 设置项目的mint信息
创建项目后，就可以设置项目的铸造信息了，需要注意的是，被铸造过的项目，就不能更改项目的铸造信息了

### 1 设置项目的铸造信息
版税的基础是10000
例如 100 就是100/10000 表示1%
```
    let projectId = 1; 项目id
    let pricePerTokenInWei=10000; mit 价格
    let maxInvocations =100 mint的最大数量
    let time = await sdkobj.moment.blockNow();
    
    let startTime =time.addHour(1);开始时间
    let disable = true; 是否可以mint
    let addrs=['0x03...6']  收取版税地址 
    let rates=[100] 版税费率
    let data1 = sdkobj.MinterSetPrice.setProjectMintInfo({projectId,pricePerTokenInWei,maxInvocations,
      startTime,disable,addrs,rates})
```
### 2 设置项目是否可铸造

```
let data = sdkobj.MinterSetPrice.togglePurchaseToDisabled(projectId)
```

### 3 设置项目铸造的价格
```
let data = sdkobj.MinterSetPrice.updatePricePerTokenInWei(projectId,10000)
```
### 4 设置项目最大可铸造数量

```
let data = sdkobj.MinterSetPrice.updateMaxInvocations(projectId,10)
```

### 5 设置铸造的开始时间
```
let data = sdkobj.MinterSetPrice.updateStartTime(projectId,startTime)
```

### 6 设置项目版税和接收地址
版税的基础是10000
例如 100 就是100/10000 表示1%
```
sdkobj.MinterSetPrice.updateProjectRoyaltyData(projectId,['0x0...6'],[100])
```
### 7 设置项目白名单地址
白名单是在项目开始铸造之前就可以铸造
如果还没有设置价格，就可以免费铸造了
```
sdkobj.MinterSetPrice.addProjectWhitelist(projectId,['0x03...D6'])
```
### 8 设置项目白名单mint价格
设置白名单用户铸造的价格
```
sdkobj.MinterSetPrice.updateProjectWhitelistPrice(projectId,10000)
```
### 9 获取项目的白名单地址

```
sdkobj.MinterSetPrice.getWhitelists(projectId)
```
### 10 获取项目的铸造信息
```
sdkobj.MinterSetPrice.getMintInfo(projectId)
```



## 6 铸造
projectId  项目id
PricePerTokenInWei 铸造的价格
```
sdkobj.MinterSetPrice.purchase(projectId,PricePerTokenInWei)
```


## 7 区块链时间相关 
获取区块链上的时间
```
let time = await sdkobj.moment.blockNow();
```
time是一个dayjs的对象

对时间的操作有 addDay addMinute addHour
例如
```
let time = await sdkobj.moment.blockNow();
    
let startTime =time.addHour(1);// 区块链时间
 startTime =time.addMinute(1);// 区块链时间
 startTime =time.addDay(1);// 区块链时间
```

## 7 直接使用合约对象 

可以比较灵活的调用合约中的方法，如果有些方法合约没有提供的话
```
let AlleriaContract = sdkobj.Alleria.getAlleriaContract()
let Contract =   sdkobj.MinterSetPrice.getContract()
```