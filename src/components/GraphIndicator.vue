<template>
  <div class="graph-item">
    <template v-if="true">
      <svg width="200" height="130" viewBox="0 0 200 130">
        <linearGradient
          :id="`linearColors${graphType[color]?.label}`"
          x1="1"
          y1="0"
          x2="0"
          y2="0"
        >
          <stop offset="0%" :stop-color="graphType[color]?.start"></stop>
          <stop offset="100%" :stop-color="graphType[color]?.end"></stop>
        </linearGradient>
        <circle
          r="80"
          cx="100"
          cy="100"
          fill="transparent"
          stroke="#E9ECEF"
          stroke-width="8"
          :stroke-dasharray="`calc(50 * calc(2*3.14*80) / 100)  calc(2*3.14*80)`"
          transform="rotate(180) translate(-200, -200)"
        ></circle>
        <circle
          r="80"
          cx="100"
          cy="100"
          fill="transparent"
          :stroke="`url(#linearColors${graphType[color]?.label})`"
          stroke-width="24"
          :stroke-dasharray="`calc((${percent} * calc(2*3.14*80) / 100) / 2)  calc(2*3.14*80)`"
          transform="rotate(180) translate(-200, -200)"
        ></circle>
      </svg>
    </template>
    <div class="graph-detail">
      <div class="categ">
        <span :style="`color: ${graphType[color]?.end}`">{{ label }}</span>
      </div>
      <div class="value">
        <span>{{ Math.round(percent * 100) / 100 }}</span>
        <span class="per">&#37;</span>
      </div>
      <div class="sub-value">
        <span :style="`color: ${graphType[color]?.end}`">{{
          Math.round(used * 100) / 100
        }}</span>
        <span class="slash">&#47;</span>
        <span>{{ Math.round(total * 100) / 100 }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MakeToast from "@/utils/makeToast";

export default {
  components: {},
  mixins: [],
  props: {
    gColor: String,
    gTotal: Number,
    gUsed: Number,
    gLabel: String,
  },
  data() {
    return {
      color: "",
      total: 0,
      used: 0,
      percent: "",
      label: "",
      warningColor: "#FA5252",
      graphType: {
        cyan: {
          label: "cyan",
          start: "#66D9E8",
          end: "#22B8CF",
        },
        blue: {
          label: "blue",
          start: "#74C0FC",
          end: "#339AF0",
        },
        purple: {
          label: "purple",
          start: "#B197FC",
          end: "#845EF7",
        },
        emerald: {
          label: "emerald",
          start: "#67EBC4",
          end: "#20C997",
        },
      } as Record<string, { label: string; start: string; end: string }>,
    };
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {
    this.color = this.gColor ?? "";
    this.total = this.gTotal ?? 0;
    this.used = this.gUsed ?? 0;
    this.percent = ((this.used / this.total) * 100).toFixed(2) ?? "";
    this.label = this.gLabel ?? "";
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.graph-item {
  position: relative;
}
.graph-detail {
  position: absolute;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  .categ {
    font-size: 15px;
    font-weight: 700;
    .icon-warning-alt-fill {
      font-size: 16px;
      margin-left: 4px;
      color: #ff0000;
    }
  }
  .value {
    span {
      font-size: 32px;
      line-height: 38px;
      color: #495057;
    }
    .per {
      font-size: 24px;
      color: #868e96;
    }
  }
  .sub-value {
    font-size: 13px;
    color: var(--gray5);
    font-weight: 700;
    .slash {
      display: inline-block;
      margin: 0 2px;
      font-weight: 400;
    }
  }
  &.node-detail {
    top: 50px;
    .categ {
      font-size: 13px;
      margin-bottom: 4px;
    }
    .value {
      margin-bottom: 4px;
      span {
        font-size: 24px;
        line-height: 28px;
      }
      .per {
        font-size: 14px;
      }
    }
    .sub-value {
      font-size: 12px;
    }
  }
}
</style>
