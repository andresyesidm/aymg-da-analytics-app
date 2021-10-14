import React, {useEffect, useState} from "react";
import {useTable} from "react-table";
import './at-table.scss'
import {useHistory} from "react-router-dom";

interface AtTableProps {
    dataSet: Record<string, any>;
    filename: string;
    fullView: boolean;
    tookTime?: number;
}

function AtTable({dataSet, filename, fullView, tookTime}: AtTableProps) {

    const history = useHistory();

    const columns = React.useMemo(
        () => {
            const cols: Array<any> = [];
            const keys = Object.keys(dataSet);
            keys.forEach((key, i) => {
                cols.push({Header: key, accessor: `col${i}`})
            })
            return cols;
        }, [dataSet]
    )

    const dataR = React.useMemo(() => {
        const rows: Array<any> = [];
        const values = Object.values(dataSet);
        values.forEach((value, index) => {
            console.log('V', value)
            Object.values(value).forEach((content, i) => {
                const row: any = {...rows[i]};
                row[`col${index}`] = content;
                rows[i] = row;
            })
        })
        return rows;
    }, [dataSet])

    const tableInstance = useTable({columns: columns as any, data: dataR})
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    const goToFullView = () => {
        console.log('Full View');
        window.dragApi.loadDropFile(filename, true);
        history.push('/fullview')
    }
    return (
        <div className='at-table'>
            <div className='header'>
                <div className='header__group'>
                    <div className='header__item'>{filename}</div>
                    {tookTime ? <div className='header__item'>Tiempo de Carga: <span>{tookTime}</span> ms</div> : ''}
                </div>
                {fullView ?
                    <div className='header__item header__button' onClick={goToFullView}>Vista Completa {'>'}</div> : ''}
            </div>
            <table className='table' {...getTableProps()}>
                <thead className='main__thead'>
                {// Loop over the header rows
                    headerGroups.map(headerGroup => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {// Loop over the headers in each row
                                headerGroup.headers.map(column => (
                                    // Apply the header cell props
                                    <th {...column.getHeaderProps()}>
                                        {// Render the header
                                            column.render('Header')}
                                    </th>
                                ))}
                        </tr>
                    ))}
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                    rows.map(row => {
                        // Prepare the row for display
                        prepareRow(row)
                        return (
                            // Apply the row props
                            <tr {...row.getRowProps()}>
                                {// Loop over the rows cells
                                    row.cells.map(cell => {
                                        // Apply the cell props
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {// Render the cell contents
                                                    cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export {AtTable}