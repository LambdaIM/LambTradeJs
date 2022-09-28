# LambTradeJs

挂卖单和挂买单

## 1 通过npm 或yarn 安装 @webfans/LambTradeJs
```
npm install  @webfans/LambTradeJs
```
```
yarn add  @webfans/LambTradeJs
```
## 2 生成api文档
```
npm install
npm run doc
```

## 3 初始化
account 为当前钱包链接的账户，
chianid 当前钱包链接网络的 chian id

 在浏览器端，钱包位小狐狸插件初始化
```
import sdk from '@webfans/LambTradeJs'
let sdkobj = new sdk(window.ethereum,account,chianid)
```
在浏览器端，使用walletconnect 

```
import sdk from '@webfans/LambTradeJs'
let rpcurl=""//http 的rpc接口
let sdkobj = new sdk(rpcurl,account,chianid)
```
在node 端，使用 
传入 Signer
```
import sdk from '@webfans/LambTradeJs'
const ethers = require('ethers');
let  WALLET = new ethers.Wallet(testconfig.PRIVATE_KEY);//WALLET 为Signer

let  RpcProvider =new ethers.providers.JsonRpcProvider(testconfig.rpcurl)
WALLET=WALLET.connect( RpcProvider)

let sdkobj = new sdk(WALLET,account,chianid)
```

如果需要传递 合约的配置地址
```
let contractConfig={
        {
                "92001":{
                    "zoraFee": "0x80fAe0df36d0AaDC3f404C9787A1C660991fA177",
                    "zora": "0x3fFD65D8Ee243bdE754507c911262d3e317F4194",
                    "erc20Helper": "0xBc33FD95869f0C537daddB21686abb011fc18057",
                    "erc721Helper": "0x25c1d5b2FF22B9A28Ee0d37FB093EaAe4dA170F4",
                    "royalty": "0x1cfEd01934478b668d4F9D9659abbCe64F64622E",
                    "wETH": "0x278974bdE980A19dCedb790b0762Ef81621F7dBe",
                    "ask": "0xc88728eb5185f8a7be642dD94EbD929474ABB5C3",
                    "offer": "0x28110c0B188DED94DAFA340f5f7198e5f8D5e091",
                }
        }
      

let sdkobj = new sdk(window.ethereum,account,chianid,contractConfig)
```
## 挂卖单
### 检测是否已对系统授权
```
let res = await sdkobj.SellOrder.checkApprovalForModule()
```

### 设置对系统授权
```
let res = await sdkobj.SellOrder.setApprovalForModule()
```


### 检测是否对nft 授权
```
let res = await sdkobj.SellOrder.checkApprovalForHelper(nftaddress)
```
### 设置对nft 授权
```
let res = await sdkobj.SellOrder.setApprovalForHelper(nftaddress)
```
### 创建卖单
```
let value =utils.parseUnits('1') 
let res = await sdkobj.SellOrder.createOrder(nftaddress,tokenID,value)
```


### 获取卖单
```
let res = await sdkobj.SellOrder.getOrder(nftaddress,tokenID)
```

### 匹配卖单
```
let res2 = await sdkobj.SellOrder.fillOrder(nftaddress,tokenID,value,askPrice)
```

### 取消卖单
```
let res = await sdkobj.SellOrder.cancelOrder(nftaddress,tokenID)
```


## 挂买单

### 检测是否对系统授权
```
let res = await sdkobj.BuyOrder.checkApprovalForModule()
```
### 设置对系统 授权
```
let res = await sdkobj.BuyOrder.setApprovalForModule()
```



### 检测是否对nft 授权
```
let res = await sdkobj.BuyOrder.checkApprovalForHelper(nftaddress)
```
### 设置 对nft授权
```
let res = await sdkobj.BuyOrder.setApprovalForHelper(nftaddress)
```

### 创建买单
```
let res = await sdkobj.BuyOrder.createOffer(nftaddress,tokenID,value)
```

### 获取买单
```
let res = await sdkobj.BuyOrder.getOffer(nftaddress,tokenID,offerid)
```

### 匹配买单
```
let res = await sdkobj.BuyOrder.fillOffer(nftaddress,tokenID,offerid)
```

### 取消卖单
```
let res = await sdkobj.BuyOrder.cancelOffer(nftaddress,tokenID,offerid)
```

## 挂系列买单


### 检测系统授权
```
let res = await sdkobj.BuyCollectionOrder.checkApprovalForModule()
```

### 设置系统授权
```
let res = await sdkobj.BuyCollectionOrder.setApprovalForHelper(nftaddress)
```

### 检测nft授权
```
let res = await sdkobj.BuyCollectionOrder.checkApprovalForHelper(nftaddress)
```

### 设置nft授权
```
let res = await sdkobj.BuyCollectionOrder.setApprovalForHelper(nftaddress)
```

### 创建系列买单
```
let res = await sdkobj.BuyCollectionOrder.createOfferList(nftaddress,tokenID,value)
```

### 获取系列买单
```
let res = await sdkobj.BuyCollectionOrder.getOfferList(nftaddress,offerid)
```

### 匹配系列买单

```
let res = await sdkobj.BuyCollectionOrder.fillOfferList(nftaddress,tokenID,offerid)
```










