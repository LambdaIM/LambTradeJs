import { zora,zoraFee,erc721Helper,ask,royalty,offer } from "./buildr/tokens";
import { useABI_Zora_Contract,useABI_ZoraFee_Contract,useABI_ERC721Helper_Contract,
  useABI_Royalty_Contract,useABI_Asks_Contract ,useABI_Offers_Contract,
  useABI_NFT_Contract
} from '../contacthelp/useContract.js';
import GasPrice from "./GasPrice";



/**
 * Base 合约相关操作方法
 * @module Base
 */
export default class Base {
     
    constructor(library, account, chainID,isestimateGas,contractConfig) {
      this.library = library;
      this.chainID = chainID;
      this.account= account;
      this.isestimateGas=isestimateGas;
      this.GasPrice = new GasPrice(library, account, chainID)
      this.contractConfig=contractConfig;
    }
    getZoraContract(isestimateGas) {
        
      const tokenaddress = zora(this.chainID,this.contractConfig);
      const Contract = useABI_Zora_Contract(this.library,
          this.account,
          tokenaddress,
          true);
      
      if(this.isestimateGas||isestimateGas){
          return Contract.estimateGas;
      }else{
          return Contract;
      }
    }
    getZoraFeeContract(isestimateGas) {
        
      const tokenaddress = zoraFee(this.chainID,this.contractConfig);
      const Contract = useABI_Zora_Contract(this.library,
          this.account,
          tokenaddress,
          true);
      
      if(this.isestimateGas||isestimateGas){
          return Contract.estimateGas;
      }else{
          return Contract;
      }
    }
    getErc721HelperContract(isestimateGas) {
        
      const tokenaddress = erc721Helper(this.chainID,this.contractConfig);
      const Contract = useABI_ERC721Helper_Contract(this.library,
          this.account,
          tokenaddress,
          true);
      
      if(this.isestimateGas||isestimateGas){
          return Contract.estimateGas;
      }else{
          return Contract;
      }
    }
    getAskContract(isestimateGas) {
        
      const tokenaddress = ask(this.chainID,this.contractConfig);
      const Contract = useABI_Asks_Contract(this.library,
          this.account,
          tokenaddress,
          true);
      
      if(this.isestimateGas||isestimateGas){
          return Contract.estimateGas;
      }else{
          return Contract;
      }
    }
    getOffersContract(isestimateGas) {
        
      const tokenaddress = offer(this.chainID,this.contractConfig);
      const Contract = useABI_Offers_Contract(this.library,
          this.account,
          tokenaddress,
          true);
      
      if(this.isestimateGas||isestimateGas){
          return Contract.estimateGas;
      }else{
          return Contract;
      }
    }
    getNftInterface(tokenaddress){
        const Contract = useABI_NFT_Contract(this.library,
            this.account,
            tokenaddress,
            true);
        
        return Contract;
    }

    
  
}