<template>
  <div class="home">
    <h1>Echo Cancellation Tester</h1>
    <explanation-section></explanation-section>
    <options-section></options-section>
    <recording-section></recording-section>
    <code-example></code-example>
    <supported-constraints></supported-constraints>
  </div>
</template>

<script>
// @ is an alias to /src

import ExplanationSection from "../components/ExplanationSection";
import RecordingSection from "../components/RecordingSection";
import OptionsSection from "../components/OptionsSection";
import CodeExample from "../components/CodeExample";
import SupportedConstraints from "../components/SupportedConstraints";
export default {
  name: 'Home',
  components: {
    SupportedConstraints,
    CodeExample,
    OptionsSection,
    RecordingSection,
    ExplanationSection
  }
}
</script>
