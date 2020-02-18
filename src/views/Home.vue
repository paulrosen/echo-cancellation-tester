<template>
  <div class="home">
    <header>
      <h1>Echo Cancellation Tester</h1>
    </header>
    <main>
      <explanation-section></explanation-section>
      <options-section></options-section>
      <recording-section></recording-section>
      <code-example></code-example>
      <supported-constraints></supported-constraints>
    </main>
    <footer-section></footer-section>
  </div>
</template>

<script>
// @ is an alias to /src

import ExplanationSection from "../components/ExplanationSection";
import RecordingSection from "../components/RecordingSection";
import OptionsSection from "../components/OptionsSection";
import CodeExample from "../components/CodeExample";
import SupportedConstraints from "../components/SupportedConstraints";
import FooterSection from "../components/FooterSection";
export default {
  name: 'Home',
  components: {
    FooterSection,
    SupportedConstraints,
    CodeExample,
    OptionsSection,
    RecordingSection,
    ExplanationSection
  }
}
</script>

<style scoped>
  header {
    background: #e6dede;
    padding: 10px 40px;
  }
  h1 {
    margin: 0;
  }
  main {
    padding: 10px 40px;
  }
</style>
