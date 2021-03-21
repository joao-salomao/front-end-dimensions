export default function toast(context, { title, message, variant = "success", solid = true }) {
    context.$root.$bvToast.toast(message, {
        title,
        variant,
        solid,
        autoHideDelay: 3000
    });
}
