import { Contract } from "@ethersproject/contracts";
import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "@ethersproject/bignumber";


import { Contract as ContractMulticall} from '@webfans/ethers-multicall';



export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// account is not optional
export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library, account) {
  if(library._isSigner&&library.address==account){
    return library
  }else{
    return account ? getSigner(library, account) : library;
  }
  
}

// account is optional
export function getContract(address, ABI, library, account) {
  // console.log('getContract');
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export function getContractMulticall(address, ABI) {
  // console.log('getContract');
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new ContractMulticall(address, ABI);
}



/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export function isZero(hexNumberString) {
  return /^0x0*$/.test(hexNumberString);
}

// add 10%
export function calculateGasMargin(value) {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
}



export function isNum(data) {
  const isnuma = /^[0-9]+$/.test(data);
  const isnumb = /^[0-9]+\.?[0-9]+?$/.test(data);
  if (isnuma || isnumb) {
    return true;
  } else {
    return false;
  }
}


