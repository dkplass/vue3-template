<script setup lang="ts">
import AppInputText from '@/components/AppInputText.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required().email().label('Email address'),
  fullName: yup.string().required().label('Full name'),
  password: yup.string().required().min(6).label('Password'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required()
    .label('Password confirmation'),
  terms: yup
    .boolean()
    .required()
    .isTrue('You must agree to terms and conditions')
    .label('terms agreement'),
  type: yup.string().required().label('Account type')
});

const { defineField, handleSubmit, resetForm, errors } = useForm({ validationSchema: schema });

const [fullName] = defineField('fullName');
const [email] = defineField('email');
const [password] = defineField('password');
const [passwordConfirm] = defineField('passwordConfirm');
const [terms] = defineField('terms');
const [type] = defineField('type');

const onSubmit = handleSubmit((values) => {
  console.log('onSubmit', values);
});

// const options = [];
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!-- <div class="field">
      <label for="fullName">Full name</label>
      <PrimeInputText
        v-model="fullName"
        aria-describedby="fullName-help"
        :class="{ 'p-invalid': errors.fullName }"
      ></PrimeInputText>
      <small id="fullName-help" class="p-error">
        {{ errors.fullName }}
      </small>
    </div> -->
    <AppInputText
      id="fullName"
      v-model="fullName"
      for-target="fullName"
      label-text="Full name"
      :input-class="{ 'p-invalid': errors.fullName }"
      :error-msg="errors.fullName"
    >
      <template v-if="errors.fullName" #error>
        {{ 'test' }}
      </template>
    </AppInputText>

    <div class="field">
      <label for="password">password</label>
      <PrimeInputText
        v-model="password"
        aria-describedby="password-help"
        type="password"
        :class="{ 'p-invalid': errors.fullName }"
      ></PrimeInputText>
      <small id="password-help" class="p-error">
        {{ errors.password }}
      </small>
    </div>

    <div class="field">
      <label for="passwordConfirm">Password Confirmation</label>
      <PrimeInputText
        v-model="passwordConfirm"
        aria-describedby="password-confirm-help"
        type="password"
        :class="{ 'p-invalid': errors.passwordConfirm }"
      ></PrimeInputText>
      <small id="password-confirm-help" class="p-error">
        {{ errors.passwordConfirm }}
      </small>
    </div>

    <div class="field">
      <label for="type">Type</label>
      <PrimeDropdown
        v-model="type"
        :options="[
          { name: '1', code: '1' },
          { name: '2', code: '2' }
        ]"
        option-label="name"
        option-value="code"
        :class="{ 'p-invaid': errors.type }"
        placeholder="Select a type"
      ></PrimeDropdown>
      <small id="email-help" class="p-error">{{ errors.type }}</small>
    </div>

    <label for="chbx">I've read and accept the terms & conditions.</label>
    <PrimeCheckbox
      id="chbx"
      v-model="terms"
      :class="{ 'p-invalid': errors.terms }"
      binary
      aria-describedby="chbx-error"
    ></PrimeCheckbox>
    <small id="chbx-error" class="p-error">
      {{ errors.terms || '&nbsp;' }}
    </small>

    <div class="footer">
      <PrimeButton label="Submit" type="submit" @click="handleSubmit"></PrimeButton>
      <PrimeButton
        label="Reset"
        type="button"
        class="p-button-secondary"
        @click="resetForm"
      ></PrimeButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
label {
  display: block;
  margin-top: 20px;
  margin-bottom: 4px;
}

.footer {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.p-error {
  display: block;
}
</style>
