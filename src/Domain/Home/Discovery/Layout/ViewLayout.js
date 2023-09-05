import React from 'react';
import DiscoveryLayout from 'Domain/Home/Discovery/Layout/DiscoveryLayout';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';

export default function View(props) {
  const { children, tabs, active, tags, title, subTitle, keywords } = props;

  return (
    <DiscoveryLayout>
      <section>
        <div className='container'>
          {tags}
          <div>
            <h3 className='text-xl font-bold text-color-dark mt-2'>{title}</h3>
          </div>
          <p className='text-sm font-medium text-color-dark mt-2'>{subTitle}</p>
          {
            (keywords?.ko?.length > 0 || keywords?.en?.length > 0)
              ? <>
                <hr className='my-6' />
                {(keywords?.ko?.length > 0)
                  && <div className='flex gap-2'>
                    <p className='text-sm font-medium text-color-regular'>한글 키워드</p>
                    <div className='flex items-center justify-start gap-2 flex-wrap flex-1'>
                      {keywords?.ko.map((e, i) => (
                        <p key={i} className='py-0.5 px-1.5 bg-color-placeholder rounded-sm text-xs font-medium text-color-white'>{e}</p>
                      ))}
                    </div>
                  </div>
                }
                {(keywords?.en?.length > 0)
                  && <div className={`flex gap-2${(keywords?.ko?.length > 0) && ' mt-3'}`}>
                    <p className='text-sm font-medium text-color-regular'>영문 키워드</p>
                    <div className='flex items-center justify-start gap-2 flex-wrap flex-1'>
                      {keywords?.en.map((e, i) => (
                        <p key={i} className='py-0.5 px-1.5 bg-color-placeholder rounded-sm text-xs font-medium text-color-white'>{e}</p>
                      ))}
                    </div>
                  </div>
                }
              </>
              : ''
          }
        </div>
      </section>
      <section className='mt-8'>
        <div className='container'>
          <TabButtons style='4-2' tabs={tabs} active={active} />
          {children}
        </div>
      </section>
    </DiscoveryLayout>
  );
}