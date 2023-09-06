import React from 'react';

export default function ViewTable(props) {
  const { summary, bodyData } = props;

  return (
    <div className='table_style01'>
      <table summary={summary}>
        <colgroup>
          <col width='13%' />
          <col width='37%' />
          <col width='13%' />
          <col width='37%' />
        </colgroup>
        <tbody>
          {bodyData?.map((e, i) => (
            <tr key={i}>
              {e.map((e2, i2) => (
                <React.Fragment key={i2}>
                  {(e2.scope)
                    ? <th scope={e2.scope} colSpan={e2.colspan} className='text-left'>
                      {e2.content}
                    </th>
                    : <td colSpan={e2.colspan}>
                      {e2.content}
                    </td>}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}