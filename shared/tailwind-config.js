// 时值 TimeValue 共享 Tailwind 配置（Quiet Precision 设计系统）
// 从各页面重复内嵌的配置中提取，统一维护，改一处全站生效
tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "surface-container-lowest": "#ffffff",
                        "on-secondary-fixed": "#1a1b1f",
                        "primary-container": "#1d1d1f",
                        "surface-dim": "#d9dadc",
                        "tertiary-container": "#002315",
                        "on-background": "#1a1c1d",
                        "on-surface-variant": "#46464a",
                        "on-surface": "#1a1c1d",
                        "tertiary-fixed": "#6ffbbe",
                        "primary-fixed": "#e4e2e4",
                        "surface-container": "#eeeef0",
                        "on-primary": "#ffffff",
                        "surface-variant": "#e2e2e4",
                        "secondary-fixed-dim": "#c7c6cb",
                        "outline": "#77767b",
                        "on-primary-container": "#868587",
                        "secondary-container": "#e0dfe4",
                        "surface-bright": "#f9f9fb",
                        "outline-variant": "#c7c6ca",
                        "tertiary": "#000502",
                        "on-error-container": "#93000a",
                        "surface": "#f9f9fb",
                        "on-error": "#ffffff",
                        "background": "#f9f9fb",
                        "primary": "#030304",
                        "on-secondary": "#ffffff",
                        "on-tertiary": "#ffffff",
                        "tertiary-fixed-dim": "#4edea3",
                        "error-container": "#ffdad6",
                        "on-secondary-container": "#626267",
                        "surface-container-highest": "#e2e2e4",
                        "on-primary-fixed-variant": "#474649",
                        "secondary-fixed": "#e3e2e7",
                        "inverse-on-surface": "#f0f0f2",
                        "on-primary-fixed": "#1b1b1d",
                        "error": "#ba1a1a",
                        "on-secondary-fixed-variant": "#46464b",
                        "on-tertiary-container": "#009869",
                        "inverse-surface": "#2f3132",
                        "on-tertiary-fixed-variant": "#005236",
                        "surface-container-high": "#e8e8ea",
                        "primary-fixed-dim": "#c8c6c8",
                        "secondary": "#5e5e63",
                        "surface-tint": "#5f5e60",
                        "surface-container-low": "#f3f3f5",
                        "inverse-primary": "#c8c6c8",
                        "on-tertiary-fixed": "#002113"
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    spacing: {
                        "gutter-card": "16px",
                        "stack-sm": "8px",
                        "margin-page": "24px",
                        "stack-lg": "32px",
                        "stack-md": "16px",
                        "unit": "4px"
                    },
                    fontFamily: {
                        "body-lg": ["Inter"],
                        "headline-lg": ["Inter"],
                        "headline-md": ["Inter"],
                        "headline-lg-mobile": ["Inter"],
                        "label-sm": ["Inter"],
                        "display-lg": ["Inter"],
                        "body-md": ["Inter"]
                    },
                    fontSize: {
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
                        "headline-md": ["24px", { "lineHeight": "30px", "fontWeight": "600" }],
                        "headline-lg-mobile": ["28px", { "lineHeight": "34px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
                        "label-sm": ["13px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }]
                    }
                }
            }
        };
