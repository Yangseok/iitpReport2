import React from 'react';

export default function ViewTable(props) {
  const { summary, bodyData } = props;

  return (
    <div className='table_style01 w_type01'>
      <table>
        <caption className='hidden_text'>{summary}</caption>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <tbody>
          {bodyData?.map((e, i) => (
            <tr key={'tr'+i}>
              {e.map((e2, i2) => (
                <React.Fragment key={'thtd'+i2}>
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