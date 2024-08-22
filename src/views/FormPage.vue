<template>
  <div>
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-lg-12">
          <form @submit.prevent="submitForm" class="needs-validation" novalidate>
            <h1 class="h4 my-4">User Details</h1>
            <div v-for="(block, index) in blocks" :key="index">
              <div class="mb-3">
                <template v-if="block.type === 'text'">
                  <label :for="block.props.title" class="form-label">{{ block.props.title }}</label>
                  <input type="text" class="form-control" :placeholder="block.props.placeholder" v-model="formData[block.token]" :required="block.props.required" :class="{ 'is-invalid': formData[block.token + '_touched'] && formData[block.token + '_invalid'] }" @input="touchField(block.token)" />
                  <div class="invalid-feedback">Field is required</div>
                </template>
                <template v-else-if="block.type === 'checkbox'">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" v-model="formData[block.token]" />
                    <label class="form-check-label" :for="block.props.title">{{ block.props.title }}</label>
                  </div>
                </template>
                <template v-else-if="block.type === 'date'">
                  <label :for="block.props.title" class="form-label">{{ block.props.title }}</label>
                  <input type="date" class="form-control" :placeholder="block.props.placeholder" v-model="formData[block.token]" :required="block.props.required" :class="{ 'is-invalid': formData[block.token + '_touched'] && formData[block.token + '_invalid'] }" @input="touchField(block.token)" />
                  <div class="invalid-feedback">Field is required</div>
                </template>
              </div>
            </div>
            <div>
              <button type="submit" class="btn btn-primary me-3">Submit</button>
              <button type="button" class="btn btn-dark" @click="goBack">Back</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blocks: [],
      formData: {}
    };
  },
  mounted() {
    const jsonData = {
      "blocks": [
        {
          "token": "PERSON_NAME",
          "type": "text",
          "props": {
            "title": "Enter Your Name",
            "required": true,
            "placeholder": "e.g jon doe"
          }
        },
        {
          "token": "IS_PERSON_MINOR",
          "type": "checkbox",
          "props": {
            "title": "is the Current person minor?",
            "default": false
          }
        },
        {
          "token": "PERSON_DOB",
          "type": "date",
          "props": {
            "title": "Enter Your DOB",
            "required": "IS_PERSON_MINOR",
            "placeholder": "e.g 01/01/2000"
          }
        }
      ]
    };
    this.blocks = jsonData.blocks;
    this.blocks.forEach(block => {
      this.formData[block.token + '_invalid'] = false;
      this.formData[block.token + '_touched'] = false;
    });
  },
  methods: {
    submitForm() {
      for (const block of this.blocks) {
        this.formData[block.token + '_touched'] = true;
      }
      
      if (this.validateForm()) {
        alert("Form submitted:", this.formData);
      } else {
        // alert('Form validation failed!')
      }
    },
    validateForm() {
      let isValid = true;
      for (const block of this.blocks) {
        if (block.props.required && !this.formData[block.token]) {
          isValid = false;
          this.formData[block.token + '_invalid'] = true;
        } else {
          this.formData[block.token + '_invalid'] = false;
        }
      }
      return isValid;
    },
    touchField(token) {
      this.formData[token + '_touched'] = true;
    },
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>