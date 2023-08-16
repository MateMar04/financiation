# Generated by Django 4.2.1 on 2023-08-03 15:22

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('financiationAPI', '0010_alter_coordinator_id_user'),
    ]
    operations = [

        migrations.RunSQL(
            "INSERT INTO \"financiationAPI_vehiclebrand\" (name) VALUES ('Stellar Motors'), ('Lunar Wheels'), ('Cosmic Carriage'), ('Celestial Motors'), ('Astral Auto'), ('Supernova Vehicles'), ('Galactic Gears'), ('Eclipse Motors'), ('Nebula Wheels'), ('Starlight Autos'), ('Infinity Rides'), ('Solar Drive'), ('Metropolis Motors'), ('Nova Automobiles'), ('Orion Wheels'), ('Astro Cars'), ('Voyager Motors'), ('Cosmos Auto'), ('Zenith Wheels'), ('Moonbeam Motors'), ('Solstice Vehicles'), ('Aurora Autos'), ('Comet Rides'), ('Astute Motors'), ('Horizon Wheels'), ('Luminous Cars'), ('Jupiter Motors'), ('Eclipse Autos'), ('Galaxy Wheels'), ('Lunar Drive'), ('Zenith Rides'), ('Meteor Motors'), ('Nimbus Wheels'), ('Stardust Autos'), ('Celestial Drive'), ('Aurora Wheels'), ('Stellar Autos'), ('Spectrum Motors'), ('Nebula Drive'), ('Moonlight Wheels'), ('Supernova Autos'), ('Galactic Drive'), ('Solar Wheels'), ('Astro Autos'), ('Voyager Drive'), ('Comet Wheels'), ('Horizon Autos'), ('Nova Drive'), ('Luminous Wheels')"),

        migrations.RunSQL(
            "INSERT INTO \"financiationAPI_vehiclemodel\" (name, id_brand_id) VALUES ('Stellar Sedan', 1), ('Lunar Cruiser', 2), ('Cosmic Compact', 3), ('Celestial Convertible', 4), ('Astral SUV', 5), ('Supernova Sports', 6), ('Galactic Hatchback', 7), ('Eclipse Electric', 8), ('Nebula Minivan', 9), ('Starlight Roadster', 10), ('Infinity Hybrid', 11), ('Solar Pickup', 12), ('Metropolis Luxury', 13), ('Nova Off-Road', 14), ('Orion Coupe', 15), ('Astro Van', 16), ('Voyager Wagon', 17), ('Cosmos Crossover', 18), ('Zenith Truck', 19), ('Moonbeam Micro', 20), ('Solstice Super', 21), ('Aurora All-Terrain', 22), ('Comet Classic', 23), ('Astute Performance', 24), ('Horizon Hybrid', 25), ('Luminous Limousine', 26), ('Jupiter Jet', 27), ('Eclipse Eco', 28), ('Galaxy Grand', 29), ('Lunar Luxury', 2), ('Zenith Zephyr', 19), ('Meteor Midsize', 30), ('Nimbus Navigator', 9), ('Stardust Subcompact', 31), ('Celestial Cruiser', 4), ('Aurora Alphine', 22), ('Stellar Streamline', 1), ('Spectrum Sports', 32), ('Nebula Navigator', 9), ('Moonlight Monarch', 20), ('Supernova Speedster', 6), ('Galactic Glide', 7), ('Solar Supremacy', 12), ('Astro Attitude', 16), ('Voyager Venture', 17), ('Comet Commuter', 23), ('Horizon Hiker', 25), ('Nova Navigator', 14), ('Luminous Luxury', 26)"),

        migrations.RunSQL(
            "INSERT INTO \"financiationAPI_vehicleplate\" (plate) VALUES ('ABC1234'), ('XYZ5678'), ('QWE8901'), ('JKL2345'), ('MNO6789'), ('RST0123'), ('UVW4567'), ('PQR8901'), ('DEF2345'), ('GHI6789'), ('LMN0123'), ('STU4567'), ('VWX8901'), ('YZA2345'), ('BCD6789'), ('EFG0123'), ('HIJ4567'), ('KLM8901'), ('NOP2345'), ('QRS6789'), ('TUV0123'), ('WXY4567'), ('ZAB8901'), ('CDE2345'), ('FGH6789'), ('IJK0123'), ('LMN4567'), ('OPQ8901'), ('RST2345'), ('UVW6789'), ('PQR0123'), ('DEF4567'), ('GHI8901'), ('JKL2345'), ('MNO6789'), ('RST0123'), ('UVW4567'), ('PQR8901'), ('DEF2345'), ('GHI6789'), ('LMN0123'), ('STU4567'), ('VWX8901'), ('YZA2345'), ('BCD6789'), ('EFG0123'), ('HIJ4567'), ('KLM8901')"),

        migrations.RunSQL(
            "INSERT INTO \"financiationAPI_vehicles\" (id_plate_id, id_brand_id, id_model_id) VALUES (1, 1, 1), (2, 2, 2), (3, 3, 3), (4, 4, 4), (5, 5, 5), (6, 6, 6), (7, 7, 7), (8, 8, 8), (9, 9, 9), (10, 10, 10), (11, 11, 11), (12, 12, 12), (13, 13, 13), (14, 14, 14), (15, 15, 15), (16, 16, 16), (17, 17, 17), (18, 18, 18), (19, 19, 19), (20, 20, 20), (21, 21, 21), (22, 22, 22), (23, 23, 23), (24, 24, 24), (25, 25, 25), (26, 26, 26), (27, 27, 27), (28, 28, 28), (29, 29, 29), (30, 30, 30), (31, 31, 31), (32, 32, 32), (33, 33, 33), (34, 34, 34), (35, 35, 35), (36, 36, 36), (37, 37, 37), (38, 38, 38), (39, 39, 39), (40, 40, 40), (41, 41, 41), (42, 42, 42), (43, 43, 43), (44, 44, 44), (45, 45, 45), (46, 46, 46), (47, 47, 47), (48, 48, 48), (48, 47, 46), (46, 47, 48)"),

        migrations.RunSQL(
            "INSERT INTO \"financiationAPI_visit\" (flyer, distance, travel_time, visit_date, civil_registration, accommodation, modernization_fund, start_time, finish_time, place_name, id_locality_id, id_group_id, id_visit_status_id, id_contacted_referrer_id, id_address_id) VALUES (123, 25, 60, DATE '2023-08-03', 456, 1, 1000, TIMESTAMP '2023-08-03 09:00', TIMESTAMP '2023-08-03 12:00', 'Park View', 1, 1, 1, 1, 1), (234, 30, 45, DATE '2023-08-04', 567, 0, 800, TIMESTAMP '2023-08-04 10:30', '2023-08-04 12:15', 'City Center', 2, 2, 2, 2, 2), (345, 40, 90, DATE '2023-08-05', 678, 1, 1200, TIMESTAMP '2023-08-05 11:00', TIMESTAMP '2023-08-05 13:30', 'Riverwalk', 3, 3, 1, 3, 3), (456, 20, 30, DATE '2023-08-06', 789, 0, 500, TIMESTAMP '2023-08-06 08:45', TIMESTAMP '2023-08-06 09:15', 'Meadowside', 1, 1, 2, 1, 1), (567, 50, 120, DATE '2023-08-07', 890, 1, 1800, TIMESTAMP '2023-08-07 14:00', TIMESTAMP '2023-08-07 16:00', 'Mountain View', 1, 2, 1, 2, 2), (123, 25, 60, DATE '2023-08-03', 456, 1, 1000, TIMESTAMP '2023-08-03 09:00', TIMESTAMP '2023-08-03 12:00', 'Park View', 2, 1, 1, 1, 1), (345, 40, 90, DATE '2023-08-04', 789, 0, 1500, TIMESTAMP '2023-08-04 10:00', TIMESTAMP '2023-08-04 12:30', 'Lake House', 3, 2, 2, 2, 2)"),

        migrations.RunSQL(
            "INSERT INTO \"financiationAPI_faq_id_ministry_department\" (ministrydepartment_id, faq_id) VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (2, 2), (2, 7), (2, 8), (3, 2), (4, 2), (4, 9), (4, 10), (4, 11), (4, 12), (5, 13), (5, 14), (5, 15), (6, 2), (6, 21), (7, 16), (7, 2)")
    ]
