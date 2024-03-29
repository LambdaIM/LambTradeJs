import moment from './moment'
import { ethers } from 'ethers';
import GasPrice from './GasPrice';
import SellOrder from './SellOrder';
import BuyOrder from './BuyOrder';
import BuyCollectionOrder from './BuyCollectionOrder'

/**
 * sdk 的入口文件
 * @module index
 */
export default class index{
    /**
    * 初始化sdk
    * @constructor
    * @param {object} ethereumOrJsonRpc - window.ethereum  或者 jsonrpc 的url 用于walletconnect Signer 用于node环境
    * @param {string} account - 当前账户的地址
    * @param {string} chainID - 当前的网络id
    */
    constructor(ethereumOrJsonRpcORSigner, account, chainID,contractConfig) {
        if(typeof ethereumOrJsonRpcORSigner == "string"){
            this.library = new ethers.providers.JsonRpcProvider(ethereumOrJsonRpcORSigner);
        }else{
            if(ethereumOrJsonRpcORSigner._isSigner){
                this.library = ethereumOrJsonRpcORSigner;
            }else{
                this.library = new ethers.providers.Web3Provider(ethereumOrJsonRpcORSigner||window.ethereum);
            }
            
        }
        
        this.contractConfig=contractConfig;
        this.chainID = chainID;
        this.account= account;

        this.SellOrder = new SellOrder(this.library,this.account,this.chainID,false,this.contractConfig)
        this.BuyOrder = new BuyOrder(this.library,this.account,this.chainID,false,this.contractConfig)

        this.BuyCollectionOrder = new BuyCollectionOrder(this.library,this.account,this.chainID,false,this.contractConfig)
        
        
        
    }
}



