import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from 'ethers';

/**
 * 获取GasPrice 相关操作方法
 * @module GasPrice
*/
export default class GasPrice{

    constructor(library, account, chainID) {
        this.library = library;
        this.chainID = chainID;
        this.account= account;        
    }
   async getgasPrice(){
       let gasPrice = await this.library.getGasPrice()
       return gasPrice;
    }
    getFee(gasBigNumber, gaspriseBigNumber){
        //ethers.utils.formatEther
        //ethers.utils.parseEther
        // const zoomBigNumber = BigNumber.from(zoomNumber);
        const gaspriseBigNumber_= BigNumber.from(gaspriseBigNumber.toString());
        const gasBigNumber_= BigNumber.from(gasBigNumber.toString());
        const fee = this.calculateGasMargin(gasBigNumber_).mul(gaspriseBigNumber_).toString();

        return ethers.utils.formatEther(fee)
    }
    // add 10%
     calculateGasMargin(value) {
        return value
      .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
      .div(BigNumber.from(10000));
     }

}