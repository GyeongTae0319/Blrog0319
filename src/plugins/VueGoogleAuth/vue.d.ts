import Vue from "vue";
import { VueGoogleAuth } from ".";

declare module "vue/types/vue" {
	interface Vue {
		$googleAuth: VueGoogleAuth;
	}
}
