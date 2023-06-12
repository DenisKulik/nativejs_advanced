import React from 'react';
import { Dispatch } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import CurrencyExchange
    from '../../components/CurrencyExchange/CurrencyExchange';
import { CurrencyState, CurrencyType } from '../../redux/currencyReducer';
import { IGlobalState } from '../../redux/state';
import {
    ChangeActionAC,
    ChangeCurrencyFieldAC,
    ChangeCurrentCurrencyAC,
    CurrencyReducersTypes
} from '../../redux/actions';

const CurrencyEContainer: React.FC = () => {
    const {
        currencies,
        currentCurrency,
        isBuying,
        amountOfBYN,
        amountOfCurrency
    } = useSelector((state: IGlobalState) => state.currency);

    const dispatch = useDispatch();

    let currencyRate: number = 0;

    const currenciesName = currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === currentCurrency) {
            currencyRate = isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) {
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'byn') {
                if (value === '') {
                    dispatch(ChangeCurrencyFieldAC(value, value));
                } else {
                    dispatch(ChangeCurrencyFieldAC(value,
                        (+Number(value).toFixed(2) / currencyRate).toFixed(2)));
                }
            } else {
                if (value === '') {
                    dispatch(ChangeCurrencyFieldAC(value, value));
                } else {
                    dispatch(ChangeCurrencyFieldAC(
                        (+Number(value).toFixed(2) * currencyRate).toFixed(2),
                        value));
                }
            }
        }
    };
    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.dataset.action === 'buy' ?
        dispatch(ChangeActionAC(true)) :
        dispatch(ChangeActionAC(false));
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency &&
        dispatch(ChangeCurrentCurrencyAC(e.currentTarget.dataset.currency));
    };

    return (
        <>
            <CurrencyExchange
                currenciesName={currenciesName}
                currentCurrency={currentCurrency}
                currencyRate={currencyRate}
                isBuying={isBuying}
                amountOfBYN={amountOfBYN}
                amountOfCurrency={amountOfCurrency}
                changeCurrencyField={changeCurrencyField}
                changeAction={changeAction}
                changeCurrentCurrency={changeCurrentCurrency}
            />
        </>
    );
};

type mapDispatchToPropsType = {
    setCurrencyAmount: (amountOfBYN: string, amountOfCurrency: string) => void
    setAction: (isBuying: boolean) => void
    changeCurrency: (currency: string) => void
}

const mapStateToProps = ({ currency }: {
    currency: CurrencyState
}): CurrencyState => {
    return {
        currencies: currency.currencies,
        currentCurrency: currency.currentCurrency,
        isBuying: currency.isBuying,
        amountOfBYN: currency.amountOfBYN,
        amountOfCurrency: currency.amountOfCurrency,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<CurrencyReducersTypes>): mapDispatchToPropsType => {
    return {
        setCurrencyAmount: (amountOfBYN: string, amountOfCurrency: string) => {
            dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
        },
        setAction: (isBuying: boolean) => dispatch(ChangeActionAC(isBuying)),
        changeCurrency: (currency: string) => {
            dispatch(ChangeCurrentCurrencyAC(currency));
        },
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CurrencyEContainer);

