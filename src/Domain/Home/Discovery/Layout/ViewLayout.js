import React from 'react';
import Layout from 'Domain/Home/Common/Layout/Sub';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';

export default function View(props) {
  const { children, tabStyle, tabs, active, tags, title, subTitle, desc, keywords } = props;

  return (
    <Layout>
      <section>
        <div className='container'>
          {tags}
          <div className='flex items-center mt-2'>
            <h2 className='text-xl font-bold text-color-dark'>{title}</h2>
            {subTitle}
          </div>
          {(desc !== '')?<p className='text-sm font-medium text-color-dark mt-2'>{desc}</p> : null}
          {
            (keywords?.ko?.length > 0 || keywords?.en?.length > 0)
              ? <>
                <hr className='my-6' />
                {(keywords?.ko?.length > 0)
                  && <div className='flex gap-2'>
                    <p className='text-sm font-medium text-color-regular'>한글 키워드</p>
                    <div className='flex items-center justify-start gap-2 flex-wrap flex-1'>
                      {keywords?.ko.map((e, i) => (
                        <p key={'ko'+i} className='py-0.5 px-1.5 bg-color-placeholder rounded-sm text-xs font-medium text-color-white'>{e}</p>
                      ))}
                    </div>
                  </div>
                }
                {(keywords?.en?.length > 0)
                  && <div className={`flex gap-2${(keywords?.ko?.length > 0) && ' mt-3'}`}>
                    <p className='text-sm font-medium text-color-regular'>영문 키워드</p>
                    <div className='flex items-center justify-start gap-2 flex-wrap flex-1'>
                      {keywords?.en.map((e, i) => (
                        <p key={'en'+i} className='py-0.5 px-1.5 bg-color-placeholder rounded-sm text-xs font-medium text-color-white'>{e}</p>
                      ))}
                    </div>
                  </div>
                }
              </>
              : ''
          }
        </div>
      </section>
      <div className='section mt-8'>
        <div className='container'>
          <TabButtons style={tabStyle ?? '4-2'} tabs={tabs} active={active} />
          {children}
        </div>
      </div>
    </Layout>
  );
}