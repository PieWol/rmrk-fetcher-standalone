import { fetchRemarks, RemarkListener, getRemarksFromBlocks, getLatestFinalizedBlock, Consolidator } from 'rmrk-tools';
import { ApiPromise, WsProvider } from '@polkadot/api';

const wsProvider = new WsProvider('wss://node.rmrk.app');

const fetchAndConsolidate = async () => {
    try {
        const api = await ApiPromise.create({ provider: wsProvider });
        const to = await getLatestFinalizedBlock(api);
        console.log(to);

        const remarkBlocks = await fetchRemarks(api, 12548155, to, ['']);
        if (remarkBlocks && (remarkBlocks != null)) {
          const remarks = getRemarksFromBlocks(remarkBlocks, ['']);
          const consolidator = new Consolidator();
          const nfts = consolidator.consolidate(remarks);
          console.log('Consolidated nfts:', nfts);
          
        }
    } catch (error) {
        console.log(error)
    }
}




