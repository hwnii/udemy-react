import { useState } from 'react';

import Header from './components/Header/Header.jsx';
import CoreConcept from './components/CoreConcept/CoreConcept.jsx';
import TabButton from './components/TabButton/TabButton.jsx';
import { CORE_CONCEPTS } from './data.js';
import { EXAMPLES } from './data.js';

function App() {
  const [selectedTopic, setSelectedTopic] = useState('');

  function handleClick(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  let tabContent = 'Please select a topic.';

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
    <div>
      <Header />
      <main>
        <section id='core-concepts'>
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((conceptItem, cnt) => (
              <CoreConcept key={cnt} {...conceptItem} />
            ))}
          </ul>
        </section>
        <section id='examples'>
          <h2>Examples</h2>
          <menu>
            <TabButton
              isSelected={selectedTopic === 'components'}
              onSelect={() => handleClick('components')}
              label='Components'
            />
            <TabButton
              isSelected={selectedTopic === 'jsx'}
              onSelect={() => handleClick('jsx')}
              label='JSX'
            />
            <TabButton
              isSelected={selectedTopic === 'props'}
              onSelect={() => handleClick('props')}
              label='Props'
            />
            <TabButton
              isSelected={selectedTopic === 'state'}
              onSelect={() => handleClick('state')}
              label='State'
            />
          </menu>
          {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;
