import { CORE_CONCEPTS } from '../../data';
import Section from '../Section/Section';
import CoreConcept from './CoreConcept/CoreConcept';

export default function CoreConcepts() {
  return (
    <Section id='core-concepts'>
      <h2>Core Concepts</h2>
      <ul>
        {CORE_CONCEPTS.map((conceptItem) => (
          <CoreConcept {...conceptItem} />
        ))}
      </ul>
    </Section>
  );
}
