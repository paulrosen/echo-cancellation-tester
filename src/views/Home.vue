<template>
  <div class="home">
    <h1>Echo Cancellation Tester</h1>
    <explanation-section></explanation-section>
    <options-section></options-section>
    <recording-section></recording-section>
  </div>
</template>

<script>
// @ is an alias to /src

import ExplanationSection from "../components/ExplanationSection";
import RecordingSection from "../components/RecordingSection";
import OptionsSection from "../components/OptionsSection";
export default {
  name: 'Home',
  components: {
    OptionsSection,
    RecordingSection,
    ExplanationSection
  }
}
</script>
