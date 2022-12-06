import tokenlist from "../../constants/token.json";
import contractlist from "../../constants/contract.json";

export const getTokenBySymbol = (chainID, symbol) => {
  const token = tokenlist.tokens.find((token) => {
    return chainID === token.chainId && token.symbol === symbol;
  });
  return token || {};
};



export const getcontract = (chainID, symbol,contractConfig) => {
  let contract= contractConfig||contractlist;
  const token = contract[chainID][symbol]
  return token || {};
};

export const zoraFee =(chainID,contractConfig)=>{
       let symbol="zeusFee"
      return  getcontract(chainID, symbol,contractConfig)
}

export const zora =(chainID,contractConfig)=>{
  let symbol="zeus"
 return  getcontract(chainID, symbol,contractConfig)
}

export const ask =(chainID,contractConfig)=>{
  let symbol="ask"
 return  getcontract(chainID, symbol,contractConfig)
}

export const erc721Helper =(chainID,contractConfig)=>{
  let symbol="erc721Helper"
 return  getcontract(chainID, symbol,contractConfig)
}

export const royalty =(chainID,contractConfig)=>{
  let symbol="royalty"
 return  getcontract(chainID, symbol,contractConfig)
}

// export const royalty =(chainID,contractConfig)=>{
//   let symbol="royalty"
//  return  getcontract(chainID, symbol,contractConfig)
// }

export const offer =(chainID,contractConfig)=>{
  let symbol="offer"
 return  getcontract(chainID, symbol,contractConfig)
}






