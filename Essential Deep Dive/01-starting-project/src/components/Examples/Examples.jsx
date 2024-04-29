import { useState } from 'react';
import TabButton from '../TabButton/TabButton';
import Section from '../Section/Section';
import { EXAMPLES } from '../../data';
import Tabs from '../Tabs/Tabs';

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState('');

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  let tabContent = <p>Please select a topic.</p>;

  if (selectedTopic) {
    tabContent = (
      <div id='tab-content'>
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }

  return (
    <Section id='examples'>
      <h2>Examples</h2>
      <Tabs
        ButtonsContainer={'menu'}
        buttons={
          <>
            <TabButton
              label={'Components'}
              isSelected={selectedTopic === 'components'}
              onClick={() => handleSelect('components')}
            />
            <TabButton
              label={'JSX'}
              isSelected={selectedTopic === 'jsx'}
              onClick={() => handleSelect('jsx')}
            />
            <TabButton
              label={'Props'}
              isSelected={selectedTopic === 'props'}
              onClick={() => handleSelect('props')}
            />
            <TabButton
              label={'State'}
              isSelected={selectedTopic === 'state'}
              onClick={() => handleSelect('state')}
            />
          </>
        }
      >
        {tabContent}
      </Tabs>
    </Section>
  );
}
