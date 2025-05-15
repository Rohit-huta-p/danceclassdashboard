const getMonthwiseFeeHistory = (feeHistory) => {
    const monthWiseFeeHistory = {};
    feeHistory.forEach((fee) => {
        const month = fee.month;
        if (!monthWiseFeeHistory[month]) {
            monthWiseFeeHistory[month] = [];
        }
        monthWiseFeeHistory[month].push(fee);
    });
    return monthWiseFeeHistory;
};