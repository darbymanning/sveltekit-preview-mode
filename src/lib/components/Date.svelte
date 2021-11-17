<script lang="ts">
  import { parseISO, format } from "date-fns";
  export let date: string;
  const parsedDate = parseISO(date);
</script>

<time datetime={parsedDate.toString()}>
  {format(parsedDate, "LLLL d, yyyy")}
</time>
