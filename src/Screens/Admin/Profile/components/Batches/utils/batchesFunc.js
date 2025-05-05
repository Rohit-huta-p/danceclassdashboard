import axiosInstance from "../../../../../../axiosInstance";


export const addBatch = async (newBatchData, setBatches) => {
    try {
        const res = await axiosInstance.post('/api/user/addbatch', newBatchData);
        console.log(res.data.batches);
        
        setBatches(res.data.batches);

    } catch (error) {  
        console.log(error);
    }
}