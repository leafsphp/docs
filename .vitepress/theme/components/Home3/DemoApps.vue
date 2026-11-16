<script setup lang="ts">
defineProps<{ app: string }>();
</script>

<!-- Finished-app mocks revealed by the demo slider. Each has its own palette. -->
<template>
<div v-if="app === 'salon'" class="lf-app" style="height: 100%; display: flex; flex-direction: column; background: linear-gradient(160deg, #FDEFF4 0%, #F4EEFA 100%); padding: 86px 16px 16px var(--lf-app-left); box-sizing: border-box">
<div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px 10px 16px; background: rgba(255,255,255,.85); border-radius: 16px; box-shadow: 0 1px 2px rgba(15,23,42,.05)">
<span style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px"><span style="width: 22px; height: 22px; border-radius: 7px; background: #7A2A4F"></span>Studio Nala</span>
<span style="display: flex; align-items: center; gap: 18px; font-size: 13px; color: #64748B">Services<span>Team</span><span style="padding: 7px 14px; border-radius: 10px; background: #BE3A6A; color: #FFFFFF; font-weight: 600">Book</span></span>
</div>
<div style="flex: 1; display: flex; justify-content: center; align-items: center; padding-top: 12px">
<div style="width: 100%; max-width: 470px; background: #FFFFFF; border-radius: 24px; padding: 26px; box-shadow: 0 1px 2px rgba(15,23,42,.04), 0 24px 60px -28px rgba(15,23,42,.25)">
<p style="margin: 0 0 4px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em">Book your appointment</p>
<p style="margin: 0 0 18px; font-size: 13.5px; color: #64748B">Haircut and style · 45 min</p>
<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-bottom: 14px">
<span style="padding: 9px 0; border-radius: 14px; background: #F1F5F9; text-align: center; font-size: 12px; color: #64748B">Mon<b style="display: block; font-size: 16px; color: #0F172A">12</b></span>
<span style="padding: 9px 0; border-radius: 14px; background: #BE3A6A; text-align: center; font-size: 12px; color: #F9D3E2">Tue<b style="display: block; font-size: 16px; color: #FFFFFF">13</b></span>
<span style="padding: 9px 0; border-radius: 14px; background: #F1F5F9; text-align: center; font-size: 12px; color: #64748B">Wed<b style="display: block; font-size: 16px; color: #0F172A">14</b></span>
<span style="padding: 9px 0; border-radius: 14px; background: #F1F5F9; text-align: center; font-size: 12px; color: #64748B">Thu<b style="display: block; font-size: 16px; color: #0F172A">15</b></span>
</div>
<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-bottom: 18px">
<span style="padding: 10px; border-radius: 12px; border: 1px solid #E2E8F0; font-size: 13.5px; text-align: center">10:00</span>
<span style="padding: 10px; border-radius: 12px; background: #7A2A4F; color: #FFFFFF; font-size: 13.5px; font-weight: 600; text-align: center">11:30</span>
<span style="padding: 10px; border-radius: 12px; border: 1px solid #E2E8F0; font-size: 13.5px; text-align: center">14:00</span>
<span style="padding: 10px; border-radius: 12px; border: 1px solid #E2E8F0; font-size: 13.5px; text-align: center">15:30</span>
<span style="padding: 10px; border-radius: 12px; background: #F8FAFC; font-size: 13.5px; text-align: center; color: #CBD5E1">16:00</span>
<span style="padding: 10px; border-radius: 12px; border: 1px solid #E2E8F0; font-size: 13.5px; text-align: center">17:30</span>
</div>
<div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; border-radius: 14px; background: #FCEEF3; margin-bottom: 14px; font-size: 13.5px"><span style="color: #8A2F55">Deposit to hold your slot</span><b style="color: #8A2F55">$20.00</b></div>
<span style="display: block; padding: 13px; border-radius: 14px; background: #BE3A6A; color: #FFFFFF; font-size: 15px; font-weight: 600; text-align: center">Pay deposit and book</span>
</div>
</div>
</div>
<div v-if="app === 'waitlist'" class="lf-app" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 98px 14px 28px var(--lf-app-left); box-sizing: border-box; background: radial-gradient(120% 80% at 50% 0%, #ECE8FF 0%, #F6F4FF 55%, #FBF8FF 100%)">
<span style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 999px; background: #FFF4CC; color: #7A5B00; font-size: 12.5px; font-weight: 600; margin-bottom: 18px"><span style="width: 6px; height: 6px; border-radius: 50%; background: #F5B400"></span>Launching this spring</span>
<p style="margin: 0 0 10px; font-size: 46px; line-height: 1.02; font-weight: 700; letter-spacing: -0.04em">Be first in line</p>
<p style="margin: 0 0 24px; font-size: 16px; color: #64748B; max-width: 380px">Early access, founder pricing and a say in what we build next.</p>
<div style="display: flex; gap: 6px; width: 100%; max-width: 430px; padding: 6px; background: #FFFFFF; border-radius: 18px; box-shadow: 0 1px 2px rgba(15,23,42,.05), 0 18px 40px -22px rgba(91,71,214,.35)">
<span style="flex: 1; padding: 11px 12px; font-size: 15px; color: #94A3B8; text-align: left">you@example.com</span>
<span style="padding: 11px 18px; border-radius: 13px; background: #5B47D6; color: #FFFFFF; font-size: 14.5px; font-weight: 600">Join the waitlist</span>
</div>
<div style="display: flex; align-items: center; gap: 10px; margin-top: 20px; font-size: 14px; color: #475569">
<span style="display: flex"><span style="width: 28px; height: 28px; border-radius: 50%; background: #DCE7FF; color: #5B47D6; border: 2px solid #FFFFFF; display: grid; place-items: center; font-size: 11px; font-weight: 700">EC</span><span style="width: 28px; height: 28px; margin-left: -8px; border-radius: 50%; background: #D7F2E3; color: #1F9D63; border: 2px solid #FFFFFF; display: grid; place-items: center; font-size: 11px; font-weight: 700">KS</span><span style="width: 28px; height: 28px; margin-left: -8px; border-radius: 50%; background: #FFF0B8; color: #8A6400; border: 2px solid #FFFFFF; display: grid; place-items: center; font-size: 11px; font-weight: 700">SR</span></span>
<span><b style="color: #0F172A">128</b> people already joined</span>
</div>
</div>
<div v-if="app === 'orders'" class="lf-app" style="height: 100%; display: flex; justify-content: center; align-items: center; padding: 90px 20px 20px var(--lf-app-left); box-sizing: border-box; background: linear-gradient(160deg, #E6F5EE 0%, #F1F8F3 60%, #FFF8E8 100%)">
<div style="width: 100%; max-width: 360px; background: #FFFFFF; border-radius: 28px; padding: 22px; box-shadow: 0 1px 2px rgba(15,23,42,.04), 0 28px 60px -30px rgba(15,23,42,.3)">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px">
<span><span style="display: block; font-size: 13px; color: #64748B">Hi Daniel</span><span style="font-size: 22px; font-weight: 700; letter-spacing: -0.02em">Your orders</span></span>
<span style="width: 38px; height: 38px; border-radius: 50%; background: #D3EEE3; color: #0F7A5C; display: grid; place-items: center; font-size: 13px; font-weight: 700">DL</span>
</div>
<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-bottom: 14px">
<span style="padding: 12px 14px; border-radius: 16px; background: #E3F3EC"><span style="display: block; font-size: 12px; color: #2F7A62">This week</span><b style="font-size: 18px; color: #0B4D3A">$42.30</b></span>
<span style="padding: 12px 14px; border-radius: 16px; background: #FFF4DA"><span style="display: block; font-size: 12px; color: #8A6400">Orders</span><b style="font-size: 18px; color: #5C4300">3</b></span>
</div>
<div style="display: flex; align-items: center; gap: 12px; padding: 11px 0"><span style="width: 38px; height: 38px; border-radius: 12px; background: #FFF4CC; display: grid; place-items: center; font-size: 12px; font-weight: 700; color: #8A6400">RB</span><span style="flex: 1"><span style="display: block; font-size: 14.5px; font-weight: 600">2 × Ramen bowl</span><span style="font-size: 12.5px; color: #64748B">Today, 12:40</span></span><span style="padding: 4px 10px; border-radius: 999px; background: #D3EEE3; color: #0F7A5C; font-size: 12px; font-weight: 600">On the way</span></div>
<div style="display: flex; align-items: center; gap: 12px; padding: 11px 0; border-top: 1px solid #F1F5F9"><span style="width: 38px; height: 38px; border-radius: 12px; background: #E9F7EF; display: grid; place-items: center; font-size: 12px; font-weight: 700; color: #0F7A5C">MP</span><span style="flex: 1"><span style="display: block; font-size: 14.5px; font-weight: 600">1 × Margherita pizza</span><span style="font-size: 12.5px; color: #64748B">Yesterday</span></span><span style="padding: 4px 10px; border-radius: 999px; background: #D7F2E3; color: #1F7A4D; font-size: 12px; font-weight: 600">Paid</span></div>
<div style="display: flex; align-items: center; gap: 12px; padding: 11px 0; border-top: 1px solid #F1F5F9"><span style="width: 38px; height: 38px; border-radius: 12px; background: #F1F5F9; display: grid; place-items: center; font-size: 12px; font-weight: 700; color: #475569">CS</span><span style="flex: 1"><span style="display: block; font-size: 14.5px; font-weight: 600">3 × Caesar salad</span><span style="font-size: 12.5px; color: #64748B">Monday</span></span><span style="padding: 4px 10px; border-radius: 999px; background: #F1F5F9; color: #64748B; font-size: 12px; font-weight: 600">Delivered</span></div>
<span style="display: block; margin-top: 12px; padding: 13px; border-radius: 16px; background: #0F7A5C; color: #FFFFFF; font-size: 15px; font-weight: 600; text-align: center">New order</span>
</div>
</div>
</template>
